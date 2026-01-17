 import { useState, useEffect } from "react";
import { useFormikContext } from "formik";
import { useDropzone } from "react-dropzone";
import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Box,
  Typography,
  TextField,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../theme";
import { createNewid } from "./../services/serviceProvider";
import ImageCropModal from "./ImageCropModal"; // our crop modal

const MAX_IMAGE_SIZE = 3 * 1024 * 1024; // 3MB

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": { padding: theme.spacing(2) },
  "& .MuiDialogActions-root": { padding: theme.spacing(1) },
}));

export default function AddVideoForm({ open, setOpen, videoToEdit }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { values, setFieldValue } = useFormikContext();

  const [video, setVideo] = useState({});
  const [tempThumbFile, setTempThumbFile] = useState(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);

  // Sync incoming videoToEdit when modal opens
  useEffect(() => {
    if (videoToEdit) {
      setVideo(videoToEdit);
    } else {
      setVideo({
        videoId: createNewid("v"),
        title: "",
        url: "",
        likes: 0,
        thumbImage: "",
        createdAt: "",
        
      });
    }
  }, [videoToEdit, open]);

  // --- Dropzone ---
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    setTempThumbFile(acceptedFiles[0]);
    setCropModalOpen(true);
  };

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    maxSize: MAX_IMAGE_SIZE,
    onDrop,
  });

  const handleClose = () => setOpen(false);

  const handleSaveChanges = () => {
    if (videoToEdit) {
      const updated = values.playlist.map((v) =>
        v.videoId === video.videoId ? video : v
      );
      setFieldValue("playlist", updated);
    } else {
      setFieldValue("playlist", [...values.playlist, video]);
    }

    setOpen(false);
  };

  const getImagePreview = () => {
    if (!video.thumbImage) return null;
    return video.thumbImage instanceof File
      ? URL.createObjectURL(video.thumbImage)
      : video.thumbImage;
  };

  // --- Crop modal complete handler ---
  const handleCropComplete = (croppedFile) => {
    // the real image is croppedFile
    setVideo({ ...video, thumbImage: croppedFile });
    /* setVideo({ ...video, thumbImage:  "" }); */
    setTempThumbFile(null);
    setCropModalOpen(false);
  };

  return (
    <Box>
      <BootstrapDialog onClose={handleClose} open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          {videoToEdit ? "Edit Video" : "Add New Video"}
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8, color: theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>
          {/* Thumbnail Upload */}
          <Box
            {...getRootProps()}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "2px dashed gray",
              p: 2,
              textAlign: "center",
              borderRadius: "8px",
              cursor: "pointer",
              mb: 1,
              minHeight: "110px",
            }}
          >
            <input {...getInputProps()} />
            {video.thumbImage ? (
              <>
                <Avatar src={getImagePreview()} sx={{ width: 80, height: 80, mx: "auto" }} />
                <Typography mt={1}>
                  {video.thumbImage instanceof File ? video.thumbImage.name : "Current image"}
                </Typography>
              </>
            ) : (
              <Typography>Click or drag image here</Typography>
            )}
          </Box>

          {/* File size error */}
          {fileRejections.length > 0 && (
            <Typography color="error" mt={1} mb={2}>
              Image must be less than or equal to 3MB
            </Typography>
          )}

          {/* --- Crop Modal --- */}
          {tempThumbFile && (
            <ImageCropModal
              open={cropModalOpen}
              onClose={() => setCropModalOpen(false)}
              imageFile={tempThumbFile}
              onCropComplete={handleCropComplete}
            />
          )}

          {/* Title */}
          <TextField
            fullWidth
            label="Video Title"
            value={video.title}
            onChange={(e) => setVideo({ ...video, title: e.target.value })}
            sx={{ mb: 2, mt: 2 }}
          />

          {/* URL */}
          <TextField
            fullWidth
            label="Video URL"
            value={video.url}
            onChange={(e) => setVideo({ ...video, url: e.target.value })}
            sx={{ mb: 2 }}
          />
        </DialogContent>

        <DialogActions>
          <Button
            sx={{
              backgroundColor: colors.purple[500],
              color: "white",
              "&:hover": { backgroundColor: colors.purple[400] },
            }}
            onClick={handleSaveChanges}
          >
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
}