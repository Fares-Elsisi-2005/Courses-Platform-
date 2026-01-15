 import { useState } from "react";

 const MAX_IMAGE_SIZE = 3 * 1024 * 1024;

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

 
export function useCloudinaryUpload() {

      


  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setuploadError] = useState(null);

  const uploadFile = async (file, resourceType = "image") => {
    setUploadLoading(true);
    setuploadError(null);

      try {
        console.log("file size: ", file.size);
        if (!file) throw new Error("No file provided");

          if (resourceType === "image" && file.size > MAX_IMAGE_SIZE) {
            
            throw new Error(`"Image must be 3MB or less" its ${file.size}`);
        }
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || "Upload failed");
      }

      return data.secure_url; // ✅ THIS is what you save in Firebase
    } catch (err) {
      setuploadError(err.message);
      throw err;
    } finally {
      setUploadLoading(false);
    }
  };

  return { uploadFile, uploadLoading, uploadError };
}