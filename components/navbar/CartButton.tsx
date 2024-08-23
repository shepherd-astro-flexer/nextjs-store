import Link from "next/link";
import { Button } from "../ui/button";
import { FaCartShopping } from "react-icons/fa6";

async function CartButton() {
  // temp
  const itemsInCart = 9;

  return (
    <Button
      asChild
      size="icon"
      variant="outline"
      className="flex justify-center items-center relative"
    >
      <Link href="/cart">
        <FaCartShopping className="w-6 h-6" />
        <span className="absolute -top-3 -right-3 bg-primary h-6 w-6 rounded-full text-xs flex justify-center items-center text-white">
          {itemsInCart}
        </span>
      </Link>
    </Button>
  );
}
export default CartButton;
