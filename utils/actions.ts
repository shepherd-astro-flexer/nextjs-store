"use server";

import db from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
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

export const testFormAction = async (formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  console.log("test log");
};

export const createProductAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  // typescript has no way to know that the page we are accessing is a protected route.
  // So for now, we just check if the user is not true, then we navigate them back to the homepage
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  try {
    const name = formData.get("name") as string;
    const company = formData.get("company") as string;
    const price = Number(formData.get("price") as string);
    const image = formData.get("image") as File;
    const description = formData.get("description") as string;
    const featured = Boolean(formData.get("featured") as string);
    console.log(featured);

    await db.product.create({
      data: {
        name,
        company,
        price,
        image: "/images/product-1.jpg",
        description,
        featured,
        clerkId: user.id,
      },
    });

    return { message: "Created Product Successfully." };
  } catch (error) {
    return { message: "error" };
  }
};
