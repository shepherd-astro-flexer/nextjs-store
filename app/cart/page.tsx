"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

function CartPage() {
  const { toast } = useToast();
  console.log(toast);

  return (
    <div>
      <h1>testing toast</h1>
      <Button
        className="capitalize"
        onClick={() => {
          toast({
            description: "Testing Toast",
            duration: 3000,
            title: "hello there",
          });
        }}
      >
        click me
      </Button>
    </div>
  );
}
export default CartPage;
