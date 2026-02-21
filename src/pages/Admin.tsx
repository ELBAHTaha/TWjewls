import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const ADMIN_PASSWORD = "twjewlsadmin2026";

interface OrderItemRow {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
}

interface OrderRow {
  id: string;
  full_name: string | null;
  customer_name?: string | null;
  phone: string;
  city: string;
  address: string;
  total_price: number | null;
  total?: number | null;
  delivery_fee: number;
  status: string;
  created_at: string;
  order_items?: OrderItemRow[];
}

const formatMoney = (value: number) => `${value} MAD`;

const formatDate = (value: string) =>
  new Date(value).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const seenOrderIdsRef = useRef<Set<string>>(new Set());
  const hasInitializedOrdersRef = useRef(false);

  const canUseSupabase = useMemo(() => Boolean(supabase), []);

  const playNotificationSound = useCallback(() => {
    try {
      const audioContext = new window.AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.value = 880;
      gainNode.gain.value = 0.08;

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.start();

      setTimeout(() => {
        oscillator.stop();
        void audioContext.close();
      }, 180);
    } catch {
      // Notification sound is optional.
    }
  }, []);

  const fetchOrders = useCallback(async (options?: { silent?: boolean; alertOnNew?: boolean }) => {
    if (!supabase) {
      setError("Supabase is not configured.");
      setLoading(false);
      return;
    }

    if (!options?.silent) {
      setLoading(true);
    }
    setError(null);

    const { data, error: fetchError } = await supabase
      .from("orders")
      .select("*, order_items(id, order_id, product_id, quantity, price)")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message || "Could not fetch orders.");
      setLoading(false);
      return;
    }

    const incomingOrders = (data ?? []) as unknown as OrderRow[];

    const newOrders = incomingOrders.filter((order) => !seenOrderIdsRef.current.has(order.id));
    if (hasInitializedOrdersRef.current && options?.alertOnNew && newOrders.length > 0) {
      window.alert("New order received!");
      playNotificationSound();
    }

    seenOrderIdsRef.current = new Set(incomingOrders.map((order) => order.id));
    hasInitializedOrdersRef.current = true;

    setOrders(incomingOrders);
    if (!options?.silent) {
      setLoading(false);
    }
  }, [playNotificationSound]);

  useEffect(() => {
    const entered = window.prompt("Admin password");
    if (entered !== ADMIN_PASSWORD) {
      navigate("/", { replace: true });
      setAuthChecked(true);
      return;
    }
    setIsAuthorized(true);
    setAuthChecked(true);
  }, [navigate]);

  useEffect(() => {
    if (!isAuthorized) return;
    void fetchOrders({ silent: false, alertOnNew: false });
  }, [isAuthorized, fetchOrders]);

  useEffect(() => {
    if (!isAuthorized) return;

    const intervalId = window.setInterval(() => {
      void fetchOrders({ silent: true, alertOnNew: true });
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isAuthorized, fetchOrders]);

  const updateStatus = async (orderId: string, status: "confirmed" | "shipped" | "delivered") => {
    if (!supabase) return;

    setUpdatingOrderId(orderId);
    setError(null);

    const { error: updateError } = await supabase.from("orders").update({ status }).eq("id", orderId);

    if (updateError) {
      setError(updateError.message || "Could not update status.");
      setUpdatingOrderId(null);
      return;
    }

    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)));
    setUpdatingOrderId(null);
  };

  if (!authChecked) {
    return <main className="min-h-screen bg-background pt-24 pb-16"><div className="container">Checking access...</div></main>;
  }

  if (!isAuthorized) {
    return null;
  }

  if (!canUseSupabase) {
    return (
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container text-destructive">Supabase is not configured.</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Back Office</p>
            <h1 className="text-3xl font-heading">Admin Orders</h1>
          </div>
          <Button onClick={() => void fetchOrders({ silent: false, alertOnNew: false })} disabled={loading}>
            Refresh
          </Button>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading orders...</p>
        ) : (
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="text-left">
                  <th className="p-3">Full Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">City</th>
                  <th className="p-3">Address</th>
                  <th className="p-3">Total Price</th>
                  <th className="p-3">Delivery Fee</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Created At</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const isExpanded = expandedOrderId === order.id;
                  const fullName = order.full_name || order.customer_name || "-";
                  const totalPrice = order.total_price ?? order.total ?? 0;

                  return (
                    <Fragment key={order.id}>
                      <tr
                        className="border-t border-border cursor-pointer hover:bg-muted/40"
                        onClick={() => setExpandedOrderId((prev) => (prev === order.id ? null : order.id))}
                      >
                        <td className="p-3">{fullName}</td>
                        <td className="p-3">{order.phone}</td>
                        <td className="p-3">{order.city}</td>
                        <td className="p-3 max-w-[260px] truncate" title={order.address}>
                          {order.address}
                        </td>
                        <td className="p-3">{formatMoney(totalPrice)}</td>
                        <td className="p-3">{formatMoney(order.delivery_fee)}</td>
                        <td className="p-3 capitalize">{order.status}</td>
                        <td className="p-3">{formatDate(order.created_at)}</td>
                        <td className="p-3">
                          <div className="flex gap-2" onClick={(event) => event.stopPropagation()}>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => void updateStatus(order.id, "confirmed")}
                              disabled={updatingOrderId === order.id}
                            >
                              Confirm
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => void updateStatus(order.id, "shipped")}
                              disabled={updatingOrderId === order.id}
                            >
                              Shipped
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => void updateStatus(order.id, "delivered")}
                              disabled={updatingOrderId === order.id}
                            >
                              Delivered
                            </Button>
                          </div>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr className="border-t border-border bg-muted/20">
                          <td className="p-3" colSpan={9}>
                            <div className="space-y-2">
                              <p className="font-medium">Order Items</p>
                              {order.order_items && order.order_items.length > 0 ? (
                                <div className="overflow-x-auto">
                                  <table className="w-full text-xs">
                                    <thead>
                                      <tr className="text-left">
                                        <th className="py-2 pr-3">product_id</th>
                                        <th className="py-2 pr-3">quantity</th>
                                        <th className="py-2 pr-3">price</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {order.order_items.map((item) => (
                                        <tr key={item.id} className="border-t border-border/60">
                                          <td className="py-2 pr-3">{item.product_id}</td>
                                          <td className="py-2 pr-3">{item.quantity}</td>
                                          <td className="py-2 pr-3">{formatMoney(item.price)}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              ) : (
                                <p className="text-xs text-muted-foreground">No items found for this order.</p>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
};

export default Admin;
