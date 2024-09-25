"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { useClerk } from "@clerk/nextjs";
import { Card, CardContent } from "../ui/card";
import FormContainer from "../form/FormContainer";
import { createReviewAction } from "@/utils/actions";
import RatingInput from "./RatingInput";
import TextareaInput from "../form/TextareaInput";
import { SubmitButton } from "../form/Buttons";

function ProductReviews({ productId }: { productId: string }) {
  const [isShowReviewForm, setIsShowReviewForm] = useState(false);
  const { user } = useClerk();

  return (
    <div className="mt-8">
      <Button
        size="lg"
        className="capitalize"
        type="button"
        onClick={() => setIsShowReviewForm((prev) => !prev)}
      >
        leave review
      </Button>
      {isShowReviewForm && (
        <div className="mt-12">
          <Card>
            <CardContent className="p-8">
              <FormContainer action={createReviewAction}>
                <input type="hidden" name="productId" value={productId} />
                <input
                  type="hidden"
                  name="authorName"
                  value={user?.firstName || "user"}
                />
                <input
                  type="hidden"
                  name="authorImageUrl"
                  value={user?.imageUrl}
                />

                <RatingInput />
                <TextareaInput
                  name="comment"
                  defaultValue="Very nice product!"
                  labelText="feedback"
                />
                <SubmitButton className="mt-6" />
              </FormContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
export default ProductReviews;
