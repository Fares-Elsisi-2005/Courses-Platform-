 import { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

// --------------------------------------------------
// ✅ FIXED crop helper
// --------------------------------------------------
const getCroppedImg = (imageSrc, pixelCrop, fileName) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous"; // safety
    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      // 🔥 EXPORT AS JPEG WITH QUALITY
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("Canvas is empty"));

          const safeName = fileName.replace(/\.(png|jpg|jpeg)$/i, ".jpg");

          const file = new File([blob], safeName, {
            type: "image/jpeg",
          });

          resolve(file);
        },
        "image/jpeg",
        0.8 // 👈 quality (70–85% ideal)
      );
    };

    image.onerror = reject;
  });
};

// --------------------------------------------------
// Component
// --------------------------------------------------
export default function ImageCropModal({
  open,
  onClose,
  imageFile,
  onCropComplete,
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  // Convert File → DataURL
  useEffect(() => {
    if (!imageFile) return;

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = () => setImageSrc(reader.result);

    return () => reader.abort();
  }, [imageFile]);

  const onCropCompleteHandler = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleCropConfirm = async () => {
    if (!croppedAreaPixels || !imageSrc) return;

    try {
      const croppedFile = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        imageFile.name
      );

      onCropComplete(croppedFile);
      onClose();
    } catch (err) {
      console.error("Crop error:", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Crop Image (16:9)</DialogTitle>

      <DialogContent
        sx={{
          position: "relative",
          height: 400,
          bgcolor: "#f0f0f0",
        }}
      >
        {imageSrc && (
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={16 / 9}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropCompleteHandler}
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleCropConfirm}
          disabled={!croppedAreaPixels}
        >
          Crop
        </Button>
      </DialogActions>
    </Dialog>
  );
}