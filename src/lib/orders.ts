import type { CartItem } from "@/lib/cart-context";
import { calculateDelivery } from "@/lib/delivery";
import { supabase } from "@/lib/supabase";

export interface CheckoutPayload {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  note?: string;
}

export interface CreateOrderInput {
  customer: CheckoutPayload;
  cartItems: CartItem[];
  cartTotal: number;
}

export interface CreateOrderResult {
  orderId: string;
  deliveryFee: number;
  totalPrice: number;
  whatsappUrl: string | null;
}

interface OrderInsertResult {
  id: string;
}

const validateCheckoutPayload = (payload: CheckoutPayload): void => {
  if (!payload.fullName.trim() || !payload.phone.trim() || !payload.city.trim() || !payload.address.trim()) {
    throw new Error("Please fill in all required checkout fields.");
  }
};

export const createCheckoutOrder = async ({
  customer,
  cartItems,
  cartTotal,
}: CreateOrderInput): Promise<CreateOrderResult> => {
  validateCheckoutPayload(customer);

  if (!supabase) {
    throw new Error("Supabase is not configured. Add your environment variables first.");
  }

  if (!cartItems.length) {
    throw new Error("Your cart is empty.");
  }

  const deliveryFee = calculateDelivery(customer.city);
  const totalPrice = cartTotal + deliveryFee;
  const fullName = customer.fullName.trim();
  const phone = customer.phone.trim();
  const city = customer.city.trim();
  const address = customer.address.trim();
  const note = customer.note?.trim() || null;

  // Support both new and legacy DB schemas to avoid checkout failures during migration.
  const payloads: Array<Record<string, unknown>> = [
    {
      full_name: fullName,
      phone,
      city,
      address,
      note,
      delivery_fee: deliveryFee,
      total_price: totalPrice,
      status: "pending",
    },
    {
      full_name: fullName,
      customer_name: fullName,
      phone,
      city,
      address,
      note,
      subtotal: cartTotal,
      delivery_fee: deliveryFee,
      total: totalPrice,
      total_price: totalPrice,
      status: "pending",
    },
    {
      customer_name: fullName,
      phone,
      city,
      address,
      subtotal: cartTotal,
      delivery_fee: deliveryFee,
      total: totalPrice,
      status: "pending",
    },
  ];

  let order: OrderInsertResult | null = null;
  let lastOrderErrorMessage = "Could not create order.";

  for (const payload of payloads) {
    const { data, error } = await supabase.from("orders").insert(payload).select("id").single();
    if (!error && data) {
      order = data as OrderInsertResult;
      break;
    }
    if (error?.message) {
      lastOrderErrorMessage = error.message;
    }
  }

  if (!order) {
    if (lastOrderErrorMessage.includes("full_name") || lastOrderErrorMessage.includes("customer_name")) {
      throw new Error("Database schema mismatch in orders table. Run DATABASE_SCHEMA.sql in Supabase and retry.");
    }
    throw new Error(lastOrderErrorMessage || "Could not create order.");
  }

  const orderItemsPayload = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.id,
    quantity: item.quantity,
    price: item.price,
  }));

  const { error: orderItemsError } = await supabase.from("order_items").insert(orderItemsPayload);
  if (orderItemsError) {
    if (
      orderItemsError.message?.includes("product_id") ||
      orderItemsError.message?.includes("order_items_product_id_fkey") ||
      orderItemsError.message?.includes("invalid input syntax for type uuid")
    ) {
      throw new Error("Database schema mismatch in order_items table. Run DATABASE_SCHEMA.sql in Supabase and retry.");
    }
    throw new Error(orderItemsError.message || "Could not save order items.");
  }

  const adminPhoneNumber = import.meta.env.VITE_ADMIN_PHONE_NUMBER;
  const whatsappMessage = `New Order Received!
Name: ${fullName}
Phone: ${phone}
City: ${city}
Total: ${totalPrice} MAD`;
  const whatsappUrl = adminPhoneNumber
    ? `https://wa.me/${adminPhoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappMessage)}`
    : null;

  return {
    orderId: order.id,
    deliveryFee,
    totalPrice,
    whatsappUrl,
  };
};
