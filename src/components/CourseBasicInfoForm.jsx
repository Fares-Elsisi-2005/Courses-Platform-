 import { useState } from "react";
import { useFormikContext } from "formik";
import { useDropzone } from "react-dropzone";
import {
  Box,
  TextField,
  Typography,
  TextareaAutosize,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Avatar,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme";
import { useAppData } from "../Contexts/AppContext";
import ImageCropModal from "./ImageCropModal"; // the modal we created

const MAX_IMAGE_SIZE = 3 * 1024 * 1024; // 3MB

const BasicInfoStep = () => {
  const { values, errors, touched, handleChange, setFieldValue } =
    useFormikContext();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { state } = useAppData();
  const { categories } = state;

  // --- Crop modal state ---
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [tempImageFile, setTempImageFile] = useState(null);

  // --- Dropzone ---
  const onDrop = (acceptedFiles, fileRejections) => {
    if (fileRejections.length > 0) return; // ignore invalid files
    if (acceptedFiles.length === 0) return;

    setTempImageFile(acceptedFiles[0]);
    setCropModalOpen(true);
  };

  const {
    getRootProps,
    getInputProps,
    fileRejections,
  } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    maxSize: MAX_IMAGE_SIZE,
    onDrop,
  });

  // --- Crop modal complete handler ---
  const handleCropComplete = (croppedFile) => {
    setFieldValue("image", croppedFile); // update Formik with cropped file
    setTempImageFile(null);
    setCropModalOpen(false);
  };

  // --- Subcategory change handler ---
  const handleSubChange = (e) => {
    const subId = e.target.value;
    const parentCategory = categories.find((cat) =>
      cat.subCategories.some((sub) => sub.id === subId)
    );

    if (parentCategory) setFieldValue("mainCategoryId", parentCategory.categoryId);
    setFieldValue("subCategoryId", subId);
  };

  return (
    <Box width="70%" p={3} bgcolor={colors.primary[200]} borderRadius="10px">
      <Typography variant="h4" mb={2}>
        Basic Info
      </Typography>

      {/* Course Image */}
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
        {values.image ? (
          <>
            <Avatar
              src={
                values.image instanceof File
                  ? URL.createObjectURL(values.image)
                  : values.image
              }
              sx={{ width: 80, height: 80, mx: "auto" }}
            />
            <Typography mt={1}>
              {values.image instanceof File ? values.image.name : "Current image"}
            </Typography>
          </>
        ) : (
          <Typography>Click or drag image here</Typography>
        )}
      </Box>

      {/* Dropzone file size error */}
      {fileRejections.length > 0 && (
        <Typography color="error" mt={1}>
          Image must be less than or equal to 3MB
        </Typography>
      )}

      {/* --- Crop Modal --- */}
      {tempImageFile && (
        <ImageCropModal
          open={cropModalOpen}
          onClose={() => setCropModalOpen(false)}
          imageFile={tempImageFile}
          onCropComplete={handleCropComplete}
        />
      )}

      {/* Title */}
      <TextField
        fullWidth
        label="Course Title"
        name="title"
        value={values.title}
        onChange={handleChange}
        error={touched.title && Boolean(errors.title)}
        helperText={touched.title && errors.title}
        sx={{ mb: 2, mt: 2 }}
      />

      {/* Description */}
      <TextareaAutosize
        name="description"
        value={values.description}
        onChange={handleChange}
        placeholder="Course Description"
        style={{
          width: "100%",
          minHeight: "120px",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid gray",
        }}
      />
      {touched.description && errors.description && (
        <Typography color="error">{errors.description}</Typography>
      )}

      {/* Category */}
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Categories</InputLabel>
        <Select
          name="subCategoryId"
          value={values.subCategoryId}
          onChange={handleSubChange}
          input={<OutlinedInput label="Categories" />}
        >
          {categories.map((cat) =>
            cat.subCategories.map((sub) => (
              <MenuItem key={sub.id} value={sub.id}>
                {sub.name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
      {touched.subCategoryId && errors.subCategoryId && (
        <Typography color="error">{errors.subCategoryId}</Typography>
      )}
    </Box>
  );
};

export default BasicInfoStep;