"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { actionFunction } from "@/utils/types";
import FormContainer from "./FormContainer";
import ImageInput from "./ImageInput";
import { SubmitButton } from "./Buttons";

type ImageContainerProps = {
  children?: React.ReactNode;
  image: string;
  name: string;
  action: actionFunction;
};

function ImageContainer({
  children,
  image,
  name,
  action,
}: ImageContainerProps) {
  const [isUpdateButtonActive, setIsUpdateButtonActive] = useState(false);

  return (
    <div>
      <Image
        src={image}
        alt={name}
        width={192}
        height={192}
        className="h-48 w-48 object-cover rounded-sm"
        priority
      />
      <Button
        variant="outline"
        size="sm"
        className="mt-4"
        onClick={() => setIsUpdateButtonActive(!isUpdateButtonActive)}
      >
        update image
      </Button>
      {isUpdateButtonActive && (
        <div className="mt-4">
          <FormContainer action={action}>
            {children}
            <ImageInput />
            <SubmitButton text="update image" size="default" />
          </FormContainer>
        </div>
      )}
    </div>
  );
}
export default ImageContainer;
