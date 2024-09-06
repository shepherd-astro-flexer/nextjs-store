"use client";

import { actionFunction } from "@/utils/types";
import React, { useEffect } from "react";
import { useToast } from "../ui/use-toast";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
};

function FormContainer({
  action,
  children,
}: {
  action: actionFunction;
  children: React.ReactNode;
}) {
  const [state, formAction] = useFormState(action, initialState);
  const { toast } = useToast();
  useEffect(() => {
    if (state.message) {
      toast({
        description: state.message,
      });
    }
  }, [state]);

  return <form action={formAction}>{children}</form>;
}
export default FormContainer;
