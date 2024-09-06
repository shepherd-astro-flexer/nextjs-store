"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

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
