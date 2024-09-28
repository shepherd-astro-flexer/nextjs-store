import { fetchAllReviews } from "@/utils/actions";
import { Card, CardContent, CardHeader } from "../ui/card";
import Rating from "./Rating";
import Comment from "./Comment";
import SectionTitle from "../global/SectionTitle";
import Image from "next/image";

async function RenderProductReviews({ productId }: { productId: string }) {
  const reviews = await fetchAllReviews({ productId });

  return (
    <div className="mt-16">
      <SectionTitle text="product reviews" />
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        {reviews.map((review, idx) => {
          const { comment, authorName, rating, authorImageUrl } = review;

          return (
            <Card key={idx}>
              <CardHeader>
                <div className="flex items-center">
                  <Image
                    src={authorImageUrl}
                    alt={authorName}
                    width={48}
                    height={48}
                    className="rounded-full object-cover w-12 h-12"
                  />
                  <div className="ml-4">
                    <h1 className="mb-1">{authorName}</h1>
                    <Rating rating={rating} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Comment comment={comment} />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
export default RenderProductReviews;
