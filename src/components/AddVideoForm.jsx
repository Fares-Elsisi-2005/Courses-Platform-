 import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useFormikContext } from "formik";
import { useDropzone } from "react-dropzone";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../theme"; 
import {
  TextField,
  Avatar,
} from "@mui/material";

import { useAppData } from "../Contexts/AppContext";
import {createNewid } from "./../services/serviceProvider";
 

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": { padding: theme.spacing(2) },
  "& .MuiDialogActions-root": { padding: theme.spacing(1) }
}));

 

export default function AddVideoForm({ open, setOpen, videoToEdit }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { values, setFieldValue } = useFormikContext();

   const { state } = useAppData();
       const {   courses } = state;

  
    

  const [video, setVideo] = useState({} );

    
  

  //  Sync incoming videoToEdit when modal opens
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
      comments: []
    });
  }
}, [videoToEdit, open]);
  // Dropzone for the thumbnail image
  const onDrop = (acceptedFiles) => {
    setVideo({ ...video, thumbImage: acceptedFiles[0] });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveChanges = () => {
    // 👉 If editing: replace existing video
    if (videoToEdit) {
      const updated = values.playlist.map(v =>
        v.videoId === video.videoId ? video : v
      );
      setFieldValue("playlist", updated);
    } else {
      // 👉 If adding new: append new video
      setFieldValue("playlist", [...values.playlist, video]);
    }

    setOpen(false);
  };

  const getImagePreview = () => {
    if (!video.thumbImage) return null;

    // If File -> use URL.createObjectURL
    if (video.thumbImage instanceof File) {
      return URL.createObjectURL(video.thumbImage);
    }

    // If string URL -> return as is
    return video.thumbImage;
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
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500]
          })}
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
              mb: 2,
              minHeight: "110px"
            }}
          >
            <input {...getInputProps()} />

            {video.thumbImage ? (
              <>
                <Avatar
                  src={getImagePreview()}
                  sx={{ width: 80, height: 80, mx: "auto" }}
                />
                <Typography mt={1}>
                  {video.thumbImage instanceof File
                    ? video.thumbImage.name
                    : "Current image"}
                </Typography>
              </>
            ) : (
              <Typography>Click or drag image here</Typography>
            )}
          </Box>

          {/* Title */}
          <TextField
            fullWidth
            label="Video Title"
            value={video.title}
            onChange={(e) =>
              setVideo({ ...video, title: e.target.value })
            }
            sx={{ mb: 2 }}
          />

          {/* URL */}
          <TextField
            fullWidth
            label="Video URL"
            value={video.url}
            onChange={(e) =>
              setVideo({ ...video, url: e.target.value })
            }
            sx={{ mb: 2 }}
          />
        </DialogContent>

        <DialogActions>
          <Button
            sx={{
              backgroundColor: colors.purple[500],
              color: "white",
              "&:hover": { backgroundColor: colors.purple[400] }
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