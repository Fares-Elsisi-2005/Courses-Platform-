import { tokens } from "../theme";
import { useAppData } from "../Contexts/AppContext";
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

const BasicInfoStep = () => {
  const { values, errors, touched, handleChange, setFieldValue } =
    useFormikContext();

  // Dropzone for course image
  const onDrop = (accepted) => {
    setFieldValue("image", accepted[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop,
  });
    const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    const { state } = useAppData();
  
  const { categories } = state;
  

  const handleSubChange = (e) => {
    const subId = e.target.value;
    // Find which category this sub belongs to
  const parentCategory = categories.find(cat =>
    cat.subCategories.some(sub => sub.id === subId )
    );
    
    if (parentCategory) {
         console.log(parentCategory.categoryId)
    setFieldValue("mainCategoryId", parentCategory.categoryId);
  }

  setFieldValue("subCategoryId", subId )
    
    console.log(parentCategory)
    console.log(subId)
  }
    

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
          alignItems:"center",
          border: "2px dashed gray",
          p: 2,
          textAlign: "center",
          borderRadius: "8px",
          cursor: "pointer",
          mb: 2,
          minHeight:"110px"
        }}
      >
        <input {...getInputProps()} />
        {values.image ? (
          <>
            <Avatar
              src={URL.createObjectURL(values.image)}
              sx={{ width: 80, height: 80, mx: "auto" }}
            />
            <Typography mt={1}>{values.image.name}</Typography>
          </>
        ) : (
          <Typography>Click or drag image here</Typography>
        )}
      </Box>

      {/* Title */}
      <TextField
        fullWidth
        label="Course Title"
        name="title"
        value={values.title}
        onChange={handleChange}
        error={touched.title && Boolean(errors.title)}
        helperText={touched.title && errors.title}
        sx={{ mb: 2 }}
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