import { FormEvent, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/lib/cart-context";
import { calculateDelivery } from "@/lib/delivery";
import { createCheckoutOrder } from "@/lib/orders";

interface CheckoutFormState {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  note: string;
}

const initialFormState: CheckoutFormState = {
  fullName: "",
  phone: "",
  city: "",
  address: "",
  note: "",
};

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState<CheckoutFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryFee = useMemo(() => (form.city.trim() ? calculateDelivery(form.city) : 35), [form.city]);
  const totalWithDelivery = totalPrice + deliveryFee;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.fullName.trim() || !form.phone.trim() || !form.city.trim() || !form.address.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields before placing your order.",
        variant: "destructive",
      });
      return;
    }

    if (!items.length) {
      toast({
        title: "Cart is empty",
        description: "Add products to your cart before checkout.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const result = await createCheckoutOrder({
        customer: {
          fullName: form.fullName,
          phone: form.phone,
          city: form.city,
          address: form.address,
          note: form.note,
        },
        cartItems: items,
        cartTotal: totalPrice,
      });

      if (result.whatsappUrl) {
        window.open(result.whatsappUrl, "_blank", "noopener,noreferrer");
      }

      clearCart();
      toast({
        title: "Order placed",
        description: "Your order has been placed successfully. We will contact you shortly to confirm.",
      });

      navigate("/order-success");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong while placing your order.";
      toast({
        title: "Checkout failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!items.length) {
    return (
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container max-w-xl text-center space-y-4">
          <h1 className="text-3xl font-heading">Your cart is empty</h1>
          <p className="text-muted-foreground">Add products to your cart before checking out.</p>
          <Button asChild>
            <Link to="/">Back to shopping</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container max-w-5xl grid gap-8 md:grid-cols-2">
        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Cash on Delivery</p>
            <h1 className="text-3xl font-heading">Checkout</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="fullName"
                value={form.fullName}
                onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="city" className="text-sm font-medium">
                City
              </label>
              <Input
                id="city"
                value={form.city}
                onChange={(event) => setForm((prev) => ({ ...prev, city: event.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium">
                Address
              </label>
              <Textarea
                id="address"
                value={form.address}
                onChange={(event) => setForm((prev) => ({ ...prev, address: event.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="note" className="text-sm font-medium">
                Optional Note
              </label>
              <Textarea
                id="note"
                value={form.note}
                onChange={(event) => setForm((prev) => ({ ...prev, note: event.target.value }))}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Placing order..." : "Place order (Cash on Delivery)"}
            </Button>
          </form>
        </section>

        <aside className="rounded-xl border border-border p-5 space-y-4 h-fit bg-card">
          <h2 className="text-xl font-heading">Order Summary</h2>

          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 text-sm">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-muted-foreground">
                    {item.quantity} x {item.price} MAD
                  </p>
                </div>
                <p className="font-medium">{item.quantity * item.price} MAD</p>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-3 space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{totalPrice} MAD</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Delivery</span>
              <span>{deliveryFee} MAD</span>
            </div>
            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>{totalWithDelivery} MAD</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Checkout;
