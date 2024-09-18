"use client";

import { toggleFavoriteAction } from "@/utils/actions";
import { FavoriteSubmitButton } from "../form/Buttons";
import { usePathname } from "next/navigation";
import FormContainer from "../form/FormContainer";

type FavoriteToggleFormProp = {
  productId: string;
  favoriteId: string | null;
};

function FavoriteToggleForm({ favoriteId, productId }: FavoriteToggleFormProp) {
  const pathname = usePathname();
  const toggleAction = toggleFavoriteAction.bind(null, {
    favoriteId,
    productId,
    pathname,
  });

  return (
    <FormContainer action={toggleAction}>
      <FavoriteSubmitButton isFavorite={favoriteId ? true : false} />
    </FormContainer>
  );
}
export default FavoriteToggleForm;
