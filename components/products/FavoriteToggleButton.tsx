import { auth } from "@clerk/nextjs/server";
import { Button } from "../ui/button";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { SignInButton } from "@clerk/nextjs";

function FavoriteToggleButton({ productId }: { productId: string }) {
  return (
    <Button variant="outline" size="icon" className="p-2">
      <FaHeart />
    </Button>
  );
}
export default FavoriteToggleButton;
