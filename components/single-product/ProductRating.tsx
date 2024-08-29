import { FaStar } from "react-icons/fa";

function ProductRating({ productId }: { productId: string }) {
  const rating = 4.2;
  const reviews = 25;

  return (
    <h3 className="flex items-center gap-x-2 font-medium">
      <FaStar className="h-3 w-3" />
      <span>
        {rating} {`(${reviews}) reviews`}
      </span>
    </h3>
  );
}
export default ProductRating;
