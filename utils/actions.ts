import db from "@/utils/db";
import { redirect } from "next/navigation";

export const fetchFeaturedProducts = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const products = await db.product.findMany({
    where: {
      featured: true,
    },
  });

  return products;
};

export const fetchAllProducts = async ({ search = "" }: { search: string }) => {
  const products = db.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
};

export const fetchSingleProduct = async ({
  productId,
}: {
  productId: string;
}) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  // ! If the product doesn't exist we redirect to the homepage
  // ? If we don't do this if block and the product doesn't exist, we are going to return null, so we will have an error
  if (!product) redirect("/");
  return product;
};
