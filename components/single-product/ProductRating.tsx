import { fetchProductRating } from "@/utils/actions";
import { FaStar } from "react-icons/fa";

async function ProductRating({ productId }: { productId: string }) {
  const { rating, count } = await fetchProductRating(productId);

  return (
    <h3 className="flex items-center gap-x-2 font-medium">
      <FaStar className="h-3 w-3" />
      <span>
        {rating} {`(${count}) reviews`}
      </span>
    </h3>
  );
}
export default ProductRating;
