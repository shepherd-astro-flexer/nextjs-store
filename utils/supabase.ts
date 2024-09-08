import { createClient } from "@supabase/supabase-js";

const bucket = "product main";

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

export const uploadImage = async (image: File) => {
  const date = Date.now();
  const newName = `${date}-${image.name}`;

  // the thing that we are doing here is async since we are uploading to supabase
  const { data } = await supabase.storage
    .from(bucket)
    .upload(newName, image, { cacheControl: "3600" });

  if (!data) {
    throw new Error("Image upload failed");
  }

  // but here, we are just getting the public url if there is a data
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};
