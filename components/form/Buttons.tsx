"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { FiTrash2 } from "react-icons/fi";
import FormContainer from "./FormContainer";
import { deleteProductAction } from "@/utils/actions";

type ButtonSizeProp = "default" | "lg" | "sm";

type SubmitButtonProps = {
  text: string;
  className?: string;
  size?: ButtonSizeProp;
};

export const SubmitButton = ({
  className,
  text,
  size = "lg",
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className={cn("capitalize", className)}
      disabled={pending}
      size={size}
    >
      {pending ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
};
// ! Button must be placed on a separate component in order for the useFormStatus to properly work
const DeleteButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button variant="ghost" size="sm" type="submit" disabled={pending}>
      {pending ? (
        <ReloadIcon className=" h-4 w-4 animate-spin" />
      ) : (
        <FiTrash2 />
      )}
    </Button>
  );
};

export function DeleteProduct({ id }: { id: string }) {
  const deleteProdutActionWithId = deleteProductAction.bind(null, id);

  return (
    <FormContainer action={deleteProdutActionWithId}>
      <DeleteButton />
    </FormContainer>
  );
}
