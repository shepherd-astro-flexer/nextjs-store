"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { useClerk } from "@clerk/nextjs";
import { Card, CardContent } from "../ui/card";
import FormContainer from "../form/FormContainer";
import { createReviewAction } from "@/utils/actions";
import RatingInput from "./RatingInput";

function ProductReviews() {
  const [isShowReviewForm, setIsShowReviewForm] = useState(false);
  const { user } = useClerk();
  console.log(user);
  return (
    <div>
      <h1 className="capitalize">product reviews</h1>
      <Button
        size="lg"
        className="capitalize"
        type="button"
        onClick={() => setIsShowReviewForm((prev) => !prev)}
      >
        leave review
      </Button>
      {isShowReviewForm && (
        <Card>
          <CardContent>
            <FormContainer action={createReviewAction}>
              <RatingInput />
            </FormContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
export default ProductReviews;
