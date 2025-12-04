import React, { useState } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Typography,
  TextareaAutosize,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Avatar,
  IconButton,
  Paper,
} from "@mui/material";

import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";

import { useDropzone } from "react-dropzone";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

//
// -------------------- Utility: unique id --------------------
//
const uid = () =>
  (typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.floor(Math.random() * 10000)}`);

//
// -------------------- Fake categories (for demo) --------------------
//
const fakeCategories = [
  {
    id: 1,
    name: "Programming",
    subCategories: [
      { id: "react", name: "React" },
      { id: "node", name: "Node.js" },
    ],
  },
  {
    id: 2,
    name: "Design",
    subCategories: [
      { id: "uiux", name: "UI/UX" },
      { id: "figma", name: "Figma" },
    ],
  },
];

//
// -------------------- Validation schemas (per step) --------------------
//
const validationSchemas = [
  Yup.object({
    courseTitle: Yup.string().required("Course title is required"),
    courseDescription: Yup.string().required("Course description is required"),
    courseCategoryId: Yup.array().min(1, "Select at least one category"),
    // coursePic optional here
  }),
  // For curriculum step, we don't require anything global — teacher can add 0 videos,
  // but you can enforce at least 1 video by changing schema below:
  // Yup.object({ videos: Yup.array().min(1,"Add at least one video") })
  Yup.object({}),
];

//
// -------------------- BasicInfoStep (uses Formik context) --------------------
//
function BasicInfoStep() {
  const { values, errors, touched, handleChange, setFieldValue } =
    useFormikContext();

  // dropzone for course image (accept images)
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setFieldValue("coursePic", acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop,
  });

  return (
    <Box maxWidth="720px" width="100%">
      <Typography variant="h5" mb={2}>
        Basic Info
      </Typography>

      <Box {...getRootProps()} sx={{
        border: "2px dashed rgba(0,0,0,0.12)",
        p: 2,
        textAlign: "center",
        borderRadius: 2,
        mb: 2,
        cursor: "pointer"
      }}>
        <input {...getInputProps()} />
        {values.coursePic ? (
          <Box>
            {values.coursePic.type?.startsWith?.("image/") ? (
              <Avatar
                src={URL.createObjectURL(values.coursePic)}
                sx={{ width: 100, height: 100, mx: "auto", mb: 1 }}
              />
            ) : (
              <Typography>{values.coursePic.name}</Typography>
            )}
            <Typography variant="body2">{values.coursePic.name}</Typography>
          </Box>
        ) : (
          <Typography variant="body2">
            {isDragActive ? "Drop the image here..." : "Click or drag an image to upload a course thumbnail"}
          </Typography>
        )}
      </Box>

      <TextField
        fullWidth
        label="Course Title"
        name="courseTitle"
        value={values.courseTitle}
        onChange={handleChange}
        error={touched.courseTitle && Boolean(errors.courseTitle)}
        helperText={touched.courseTitle && errors.courseTitle}
        sx={{ mb: 2 }}
      />

      <TextareaAutosize
        name="courseDescription"
        value={values.courseDescription}
        onChange={handleChange}
        placeholder="Course Description"
        style={{
          width: "100%",
          minHeight: 120,
          padding: 12,
          borderRadius: 8,
          border: "1px solid rgba(0,0,0,0.23)",
        }}
      />
      {touched.courseDescription && (
        <Typography color="error" variant="caption">{errors.courseDescription}</Typography>
      )}

      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Categories</InputLabel>
        <Select
          multiple
          name="courseCategoryId"
          value={values.courseCategoryId}
          onChange={handleChange}
          input={<OutlinedInput label="Categories" />}
        >
          {fakeCategories.map((cat) =>
            cat.subCategories.map((sub) => (
              <MenuItem key={sub.id} value={sub.id}>
                {sub.name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
      {touched.courseCategoryId && (
        <Typography color="error" variant="caption">{errors.courseCategoryId}</Typography>
      )}
    </Box>
  );
}

//
// -------------------- AddVideoForm (NOT Formik) --------------------
//
function AddVideoForm({ onCancel, onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const reset = () => {
    setTitle("");
    setDescription("");
    setYoutubeLink("");
    setVideoFile(null);
    setThumbnail(null);
  };

  const submit = () => {
    if (!title.trim()) {
      alert("Video title is required");
      return;
    }
    // build video object (file objects are stored directly; upload later to Cloudinary)
    const videoObj = {
      id: uid(),
      title: title.trim(),
      description: description.trim(),
      youtubeLink: youtubeLink.trim() || null,
      videoFile: videoFile || null,
      thumbnail: thumbnail || null,
    };
    onAdd(videoObj);
    reset();
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" mb={1}>Add Video</Typography>

      <TextField
        fullWidth
        label="Video Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 1 }}
      />

      <TextField
        fullWidth
        label="Short description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={2}
        sx={{ mb: 1 }}
      />

      <TextField
        fullWidth
        label="YouTube Link (optional)"
        value={youtubeLink}
        onChange={(e) => setYoutubeLink(e.target.value)}
        sx={{ mb: 1 }}
      />

      <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
        <Button variant="outlined" component="label">
          Upload video
          <input
            type="file"
            accept="video/*"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setVideoFile(f);
            }}
          />
        </Button>

        <Button variant="outlined" component="label">
          Upload thumbnail
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setThumbnail(f);
            }}
          />
        </Button>
      </Box>

      {videoFile && (
        <Box sx={{ mb: 1 }}>
          <Typography variant="body2">Selected video: {videoFile.name}</Typography>
        </Box>
      )}
      {thumbnail && (
        <Box sx={{ mb: 1 }}>
          <Avatar src={URL.createObjectURL(thumbnail)} sx={{ width: 80, height: 80 }} />
        </Box>
      )}

      <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
        <Button onClick={submit} variant="contained">Add</Button>
        <Button onClick={onCancel} variant="outlined">Cancel</Button>
      </Box>
    </Paper>
  );
}

//
// -------------------- SortableVideoCard (dnd-kit sortable) --------------------
//
function SortableVideoCard({ video, index, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: video.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: "1px solid rgba(0,0,0,0.12)",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    display: "flex",
    gap: 12,
    alignItems: "center",
    background: "#fff",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {video.thumbnail ? (
        <Avatar variant="rounded" src={video.thumbnail instanceof File ? URL.createObjectURL(video.thumbnail) : video.thumbnail} sx={{ width: 84, height: 60 }} />
      ) : (
        <Avatar variant="rounded" sx={{ width: 84, height: 60 }}>{index + 1}</Avatar>
      )}
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle1">{video.title}</Typography>
        <Typography variant="caption" color="text.secondary">
          {video.youtubeLink ? "YouTube link" : (video.videoFile ? video.videoFile.name : "No file")}
        </Typography>
      </Box>
      <Box>
        <Button color="error" onClick={() => onRemove(video.id)}>Remove</Button>
      </Box>
    </div>
  );
}

//
// -------------------- CurriculumStep (uses dnd-kit + Formik) --------------------
//
function CurriculumStep() {
  const { values, setFieldValue } = useFormikContext();
  const [showAdd, setShowAdd] = useState(false);

  // sensors for pointer drag
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  // add video handler
  const handleAdd = (videoObj) => {
    const next = [...(values.videos || []), videoObj];
    setFieldValue("videos", next);
    setShowAdd(false);
  };

  // remove video
  const handleRemove = (id) => {
    const next = (values.videos || []).filter((v) => v.id !== id);
    setFieldValue("videos", next);
  };

  // drag end handler
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = (values.videos || []).findIndex((v) => v.id === active.id);
    const newIndex = (values.videos || []).findIndex((v) => v.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const newArray = arrayMove(values.videos || [], oldIndex, newIndex);
    setFieldValue("videos", newArray);
  };

  return (
    <Box maxWidth="720px" width="100%">
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5">Curriculum</Typography>
        <Button variant="contained" onClick={() => setShowAdd(true)}>+ Add Video</Button>
      </Box>

      {showAdd && (
        <AddVideoForm
          onCancel={() => setShowAdd(false)}
          onAdd={handleAdd}
        />
      )}

      <Box>
        {(values.videos || []).length === 0 && (
          <Typography color="text.secondary">No videos added yet. Click "Add Video" to start.</Typography>
        )}
      </Box>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={(values.videos || []).map((v) => v.id)} strategy={verticalListSortingStrategy}>
          <Box sx={{ mt: 2 }}>
            {(values.videos || []).map((video, i) => (
              <SortableVideoCard key={video.id} video={video} index={i} onRemove={handleRemove} />
            ))}
          </Box>
        </SortableContext>
      </DndContext>
    </Box>
  );
}

//
// -------------------- MAIN CreateCourse component --------------------
//
export default function CreateCourse() {
  const [step, setStep] = useState(0);
  const steps = ["Basic Info", "Curriculum"];
  const isLastStep = step === steps.length - 1;

  const handleSubmit = async (values, helpers) => {
    if (isLastStep) {
      // Final submit -> here you'd upload files to Cloudinary (thumbnails, videos),
      // then save course object to Firestore including uploaded URLs.
      console.log("Final submit:", values);
      // Simulate saving
      alert("Course payload logged to console. Implement upload/save logic now.");
    } else {
      setStep((s) => s + 1);
      // clear touched so new step won't show validation errors immediately
      helpers.setTouched({});
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={3}>Create Course</Typography>

      <Formik
        initialValues={{
          coursePic: null,
          courseTitle: "",
          courseDescription: "",
          courseCategoryId: [],
          videos: [],
        }}
        validationSchema={validationSchemas[step]}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stepper activeStep={step} sx={{ mb: 3 }}>
              {steps.map((label, i) => (
                <Step key={i}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box>
              {step === 0 && <BasicInfoStep />}
              {step === 1 && <CurriculumStep />}

              <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
                {step > 0 && (
                  <Button variant="outlined" onClick={() => setStep((s) => s - 1)}>
                    Back
                  </Button>
                )}

                <Box sx={{ flex: 1 }} />

                <Button type="submit" variant="contained">
                  {isLastStep ? "Publish Course" : "Next"}
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}