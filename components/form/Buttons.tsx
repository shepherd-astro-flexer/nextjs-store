"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

export const SubmitButton = ({ text }: { text: string }) => {
  const { pending } = useFormStatus();

  if (pending) {
    return <ButtonLoading />;
  }

  return (
    <Button type="submit" size="lg">
      {text}
    </Button>
  );
};

function ButtonLoading() {
  return (
    <Button disabled>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  );
}
