import { FaRegStar, FaStar } from "react-icons/fa";

function Rating({ rating }: { rating: number }) {
  const stars = Array.from({ length: 5 }, (_, idx) => {
    return idx + 1 <= rating;
  });

  return (
    <div className="flex flex-row items-center gap-x-1">
      {stars.map((star, idx) => {
        const className = `w-3 h-3 ${star ? "text-primary" : "text-gray-400"}`;

        return (
          <div key={idx}>
            {star ? (
              <FaStar className={className} />
            ) : (
              <FaRegStar className={className} />
            )}
          </div>
        );
      })}
    </div>
  );
}
export default Rating;
