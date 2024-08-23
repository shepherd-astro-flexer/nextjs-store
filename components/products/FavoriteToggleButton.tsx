import { Button } from "../ui/button";
import { FaHeart } from "react-icons/fa6";

function FavoriteToggleButton({ productId }: { productId: string }) {
  return (
    <Button variant="outline" size="icon" className="p-2">
      <FaHeart />
    </Button>
  );
}
export default FavoriteToggleButton;
