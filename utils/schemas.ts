import { z, ZodSchema } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(2, { message: "name must be at least 2 characters." })
    .max(100, { message: "name must not be greater than 100 characters." }),
  company: z.string(),
  price: z.coerce
    .number()
    .int()
    .min(0, { message: "price must be a positive number." }),
  description: z.string().refine(
    (description) => {
      const wordsLength = description.split(" ").length;

      return wordsLength >= 10 && wordsLength <= 1000;
    },
    { message: "description must be greater than 10 and less than 1000 words." }
  ),
  featured: z.coerce.boolean(),
});

export const reviewSchema = z.object({
  productId: z.string().refine((value) => value !== "", {
    message: "Product ID cannot be empty",
  }),
  authorName: z.string().refine((value) => value !== "", {
    message: "Author name cannot be empty",
  }),
  authorImageUrl: z.string().refine((value) => value !== "", {
    message: "Author image URL cannot be empty",
  }),
  rating: z.coerce
    .number()
    .int()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating must be at most 5" }),
  comment: z
    .string()
    .min(10, { message: "Comment must be at least 10 characters long" })
    .max(1000, { message: "Comment must be at most 1000 characters long" }),
});

export const validateImage = () => {
  const maxUploadSize = 1024 * 1024; // 1MB
  const acceptedFileTypes = ["image/"];

  // ! Sa False mag-go yung message!

  return z
    .instanceof(File)
    .refine(
      (file) => {
        // if !file is true, that means there is no file
        return !file || file.size <= maxUploadSize;
      },
      { message: "File must not exceed 1MB" }
    )
    .refine(
      (file) => {
        return (
          !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
        );
      },
      { message: "File type must be an image" }
    );
};

export const imageSchema = z.object({
  image: validateImage(),
});

export function validateWithZodSchema<T>(schema: ZodSchema<T>, data: unknown) {
  const result = schema.safeParse(data);
  // using safeParse returns an object with two props, success and data
  if (!result.success) {
    // if there is an error, then we want to map the error since there might be multiple ones
    const error = result.error.errors.map((error) => error.message);
    // Then we throw the error and pass in the error reference. We will use the join method include all the error in one message
    throw new Error(error.join(", "));
  }
  // if everything is correct, we return the data
  return result.data;
}
