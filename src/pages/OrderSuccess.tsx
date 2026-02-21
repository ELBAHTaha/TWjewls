import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

const OrderSuccess = () => {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-heading">Order Confirmed</h1>
        <p className="text-muted-foreground text-lg">
          Your order has been placed successfully. We will contact you shortly to confirm.
        </p>
        <Button asChild>
          <Link to="/">Back to Homepage</Link>
        </Button>
      </div>
    </main>
  );
};

export default OrderSuccess;
