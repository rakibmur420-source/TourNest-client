import axios from "axios";

/**
 * Uploads an image file to ImgBB and returns the hosted image URL.
 * Requires NEXT_PUBLIC_IMGBB_API_KEY to be set in the client's .env.local
 * Get a free key at https://api.imgbb.com/
 */
export const uploadImageToImgBB = async (file: File): Promise<string> => {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Image upload is not configured. Add NEXT_PUBLIC_IMGBB_API_KEY to your .env.local file."
    );
  }

  const formData = new FormData();
  formData.append("image", file);

  const res = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData);

  if (!res.data?.data?.url) {
    throw new Error("Image upload failed. Please try again.");
  }

  return res.data.data.url as string;
};
