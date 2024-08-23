import db from "@/utils/db";

export const fetchFeaturedProducts = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const products = await db.product.findMany({
    where: {
      featured: true,
    },
  });

  return products;
};

export const fetchAllProducts = async () => {
  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
};
