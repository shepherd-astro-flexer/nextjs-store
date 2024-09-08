"use server";

import db from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { imageSchema, productSchema, validateWithZodSchema } from "./schemas";
import { error } from "console";
import { uploadImage } from "./supabase";

const getAuthUser = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  return user;
};

const renderError = (error: unknown) => {
  return {
    message: error instanceof Error ? error.message : "An error occured.",
  };
};

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
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  // typescript has no way to know that the page we are accessing is a protected route.
  // So for now, we just check if the user is not true, then we navigate them back to the homepage
  const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File;
    const validatedFields = validateWithZodSchema(productSchema, rawData);
    const validatedImage = validateWithZodSchema(imageSchema, { image: file });
    const image = await uploadImage(validatedImage.image);

    await db.product.create({
      data: {
        ...validatedFields,
        image: image,
        clerkId: user.id,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  // redirect to admin products
  redirect("/admin/products");
};
