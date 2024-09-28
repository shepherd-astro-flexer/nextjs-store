import { DeleteProduct } from "@/components/form/Buttons";
import SectionTitle from "@/components/global/SectionTitle";
import Comment from "@/components/reviews/Comment";
import Rating from "@/components/reviews/Rating";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { fetchAllUserReviews } from "@/utils/actions";
import Image from "next/image";
import { deleteReviewAction } from "@/utils/actions";

async function ReviewsPage() {
  const reviews = await fetchAllUserReviews();

  if (reviews.length < 1) {
    return <SectionTitle text="you have no reviews yet" />;
  }

  return (
    <section>
      <SectionTitle text="product reviews" />
      <div className="mt-8 grid md:grid-cols-2 gap-8">
        {reviews.map((review, idx) => {
          const { image, name } = review.product;
          const { rating, comment, id } = review;

          return (
            <Card key={idx} className="relative">
              <CardHeader>
                <div className="flex items-center">
                  <Image
                    src={image}
                    alt={name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover w-12 h-12"
                  />
                  <div className="ml-4">
                    <h1 className="mb-1">{name}</h1>
                    <Rating rating={rating} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Comment comment={comment} />
              </CardContent>
              <div className="absolute top-3 right-3">
                <DeleteProduct id={id} action={deleteReviewAction} />
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
export default ReviewsPage;
