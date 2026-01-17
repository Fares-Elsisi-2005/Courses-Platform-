 // CurriculumStepSortable.jsx
import React from "react";
import { useFormikContext } from "formik";
import { Box, Typography, Card, CardContent, CardActions, IconButton ,  Checkbox ,Button} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from '@mui/icons-material/Delete';
import { ReactSortable } from "react-sortablejs";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../theme";
import { useState } from "react";
import { getimageUrl} from "./../services/serviceProvider";
import AddVideoForm from "../components/AddVideoForm";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };

 const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function CurriculumStepSortable() {
  const { values, setFieldValue } = useFormikContext();
  const playlist = values.playlist || [];
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [videoToEdit, setVideoToEdit] = useState({})

  const handleClickOpen = () => {
     setVideoToEdit( null)
    setOpen(true);
  };
  
 

  // ReactSortable will provide a new array in the same shape; we keep the required props.
  const setList = (newList) => {
    // newList items come from the card DOM data; ensure we keep the video object shape
    // If you pass objects directly as list items, ReactSortable will try to mutate them — this keeps it safe.
    setFieldValue("playlist", newList);
  };

   
const handleSelectedVideo = (isChecked, videoData) => {
  setSelectedVideos(prev => {
    const updated = isChecked
      ? [...prev, videoData]
      : prev.filter(v => v.videoId !== videoData.videoId);

    console.log("SELECTED ITEMS:", updated);
    return updated;
  });
  };
  
const handleDeleteVideos = () => {
  const updatedPlaylist = playlist.filter(video => !selectedVideos.some(selected => selected.videoId === video.videoId));
  setFieldValue("playlist", updatedPlaylist);
  setSelectedVideos([]);
  setDeleteConfirmOpen(false);
  }
  
  const handleVideoEdit = (video) => {
    setVideoToEdit(video)
    setOpen(true)
  }

  return (
    <Box width="100%" p={3} bgcolor={colors.primary[200]} borderRadius="10px">
      
       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold" color={colors.primary[300]}>
          Course Curriculum
        </Typography>

        {selectedVideos.length > 0 ?
          <IconButton aria-label="delete" onClick={()=>{setDeleteConfirmOpen(true)}}   >
            <DeleteIcon sx={{ color: colors.purple[500],fontSize:"1.5em" }} />
          </IconButton>
          :
          <IconButton aria-label="delete" disabled color="primary"   >
            <DeleteIcon style={{fontSize:"1.5em"}} />
          </IconButton>
          
        }
        
      </Box>


      <ReactSortable
        list={playlist}
        setList={setList}
        animation={180}
        ghostClass="sortable-ghost"
        handle=".dragHandle"
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          alignItems: "start",
        }}
      >
        {/* ReactSortable's direct children must be the items */}
        {playlist.map((video, idx) => (
          <div key={video.videoId} style={{ width: "100%" }}>
            <Card
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0px 3px 12px rgba(0,0,0,0.08)",
                cursor: "grab",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ position: "relative", height: 160 }}>
                <img
                  src={getimageUrl(video.thumbImage)}
                  alt={video.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <Checkbox onClick={(e)=>{handleSelectedVideo(e.target.checked,video)}} {...label} sx={{ position: "absolute", top: 8, right: 8, color: colors.purple[500],
          '&.Mui-checked': {
            color: colors.purple[500],
          },}} />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.45)" },
                  }}
                >
                  <PlayArrowIcon sx={{ color: "white", fontSize: 56, opacity: 0.95 }} />
                </Box>
              </Box>

              <CardContent sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight="700">{video.title}</Typography>
              </CardContent>

              <CardActions sx={{ px: 2, py: 1, borderTop: "1px solid #eee", justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">{idx + 1}</Typography>

                <Button sx={{ backgroundColor: colors.blue[100] }} variant="contained" onClick={() => { handleVideoEdit(video) }}>edit</Button>


                {/* drag handle: class must match handle prop above */}
                <IconButton className="dragHandle" size="small" sx={{ border: "1px solid #ddd" }}>
                  <DragIndicatorIcon />
                </IconButton>
              </CardActions>
            </Card>
          </div>
        ))}
        <Card  sx={{
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0px 3px 12px rgba(0,0,0,0.08)",
                cursor: "grab",
                height: "100%",
                display: "flex",
          flexDirection: "column",
                alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
                "&:hover": {
                  backgroundColor: colors.primary[400],
                  borderRadius: "12px",
                  transition: "background 0.25s ease",
                }
        }} onClick={handleClickOpen} >
          +
        </Card>
      </ReactSortable>

      <AddVideoForm open={open} setOpen={setOpen} videoToEdit={videoToEdit}  />
      
      <Dialog
        open={deleteConfirmOpen}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={()=>{setDeleteConfirmOpen(false)}}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "500px",  // Set your width here
              
            },
          },
        }}
      >
        <DialogTitle>{"confirmation message !!"}</DialogTitle>
           
        <DialogContent  >
          <DialogContentText id="alert-dialog-slide-description">
             Delete {selectedVideos.length} videos
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{backgroundColor:colors.purple[500]}}  variant="contained" onClick={()=>{setDeleteConfirmOpen(false)}}>cancle</Button>
          <Button sx={{backgroundColor:colors.purple[500]}}  variant="contained" onClick={handleDeleteVideos}>delete</Button>
        </DialogActions>
      </Dialog>



     <style>{`
  /* ghost style when dragging */
  .sortable-ghost {
    opacity: 0.4;
    transform: scale(0.96);
  }

  /* the element currently being picked up */
  .sortable-chosen {
    box-shadow: 0 6px 18px rgba(0,0,0,0.12) !important;
    cursor: grabbing !important;
  }

  /* the clone that follows the mouse */
  .sortable-drag {
    opacity: 0.9 !important;
    filter: drop-shadow(0 6px 14px rgba(0,0,0,0.15));
    cursor: grabbing;
  }

  /* highlight the item you're hovering over (THIS IS WHAT YOU WANT) */
  .sortable-closest {
    background: #f3f3f3 !important;
    border-radius: 12px;
    transition: background 0.25s ease;
  }
`}</style>
    </Box>
  );
}