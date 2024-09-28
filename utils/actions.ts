"use server";

import db from "@/utils/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  imageSchema,
  productSchema,
  reviewSchema,
  validateWithZodSchema,
} from "./schemas";
import { deleteImage, uploadImage } from "./supabase";
import { revalidatePath } from "next/cache";

const getAuthUser = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  return user;
};

const getAdminUser = async () => {
  // ! Extra check. If the user id is not the same as the admin user id, redirect the user back to the home page
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER_ID) redirect("/");

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

export const fetchAdminProducts = async () => {
  await getAdminUser();

  const products = await db.product.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return products;
};

export const deleteProductAction = async (id: string) => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  // Check if the user is an admin
  await getAdminUser();

  try {
    // We can use revalidate on the try block, but don't use redirect
    // We are also get back the product info from this request
    const product = await db.product.delete({
      where: {
        id,
      },
    });
    // We pass in the product image(url) to the helper function that will be needed in order to delete the image in the bucket
    deleteImage(product.image);

    revalidatePath("/admin/products");
    return { message: "Successfully deleted product" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchAdminProduct = async (id: string) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
  });
  if (!product) redirect("/admin/products");

  return product;
};

export const updateSingleProductAction = async (
  prevState: any,
  formData: FormData
) => {
  await getAdminUser();

  try {
    const id = formData.get("id") as string;
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(productSchema, rawData);

    await db.product.update({
      where: {
        id,
      },
      data: {
        ...validatedFields,
      },
    });

    revalidatePath(`/admin/products/${id}/edit`);
    return { message: "Successfully updated product" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateProductImageAction = async (
  prevState: any,
  formData: FormData
) => {
  await getAdminUser();

  try {
    const id = formData.get("id") as string;
    const url = formData.get("url") as string;
    const file = formData.get("image") as File;
    const validatedFile = validateWithZodSchema(imageSchema, { image: file });
    // Image is looking for the url
    const image = await uploadImage(validatedFile.image);
    // Delete the old image right away
    await deleteImage(url);

    await db.product.update({
      where: {
        id,
      },
      data: {
        image,
      },
    });
    // We delete the previous image by using the previous url
    // Revalidate to the same path
    revalidatePath(`/admin/products/${id}/edit`);
    // Return message for the toast
    return { message: "Image updated successfully." };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavoriteId = async ({ productId }: { productId: string }) => {
  const user = await getAuthUser();

  const favorite = await db.favorite.findFirst({
    where: {
      productId,
      clerkId: user.id,
    },
    select: {
      id: true,
    },
  });

  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  favoriteId: string | null;
  productId: string;
  pathname: string;
}) => {
  const user = await getAuthUser();
  const { favoriteId, pathname, productId } = prevState;

  try {
    // ! id is automatically generated
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorite.create({
        data: {
          productId,
          clerkId: user.id,
        },
      });
    }

    revalidatePath(pathname);
    return {
      message: favoriteId ? "Removed from favorites." : "Added to favorites.",
    };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchUserFavorites = async () => {
  const user = await getAuthUser();

  const favorites = await db.favorite.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
    },
  });
  return favorites;
};

export const createReviewAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAuthUser();
  // console.log(user);
  try {
    const rawData = Object.fromEntries(formData);
    const validatedField = validateWithZodSchema(reviewSchema, rawData);

    await db.review.create({
      data: {
        ...validatedField,
        clerkId: user.id,
      },
    });

    revalidatePath(`/products/${validatedField.productId}`);

    return { message: "Review successful." };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchAllReviews = async ({ productId }: { productId: string }) => {
  const reviews = await db.review.findMany({
    where: {
      productId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return reviews;
};

export const fetchProductRating = async (productId: string) => {
  const rating = await db.review.groupBy({
    by: ["productId"],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      productId,
    },
  });

  // rating could be empty, so we need to return some value when that happens
  return {
    rating: rating[0]?._avg?.rating?.toFixed(1) ?? 0,
    count: rating[0]?._count?.rating ?? 0,
  };
};

export const fetchAllUserReviews = async () => {
  const user = await getAuthUser();

  const reviews = await db.review.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
    },
  });

  return reviews;
};

export const deleteReviewAction = async (id: string) => {
  await getAuthUser();

  try {
    await db.review.delete({
      where: {
        id,
      },
    });

    revalidatePath("/reviews");
    return {
      message: "Successfully deleted review.",
    };
  } catch (error) {
    return renderError(error);
  }
};
