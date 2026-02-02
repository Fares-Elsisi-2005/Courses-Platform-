import {useTheme, Box,Button ,Typography,IconButton  ,Divider,Avatar  } from "@mui/material";
import { tokens } from "../theme";
import "../components/handleComment/styleComments.css";
import { useState, useRef, useEffect,useMemo } from "react";

import { useAuth } from "../Contexts/AuthContext";
 
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
 
import {formatTimestamp,getimageUrl } from "../services/serviceProvider";
import { useNavigate } from "react-router-dom";
 

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
        ...theme.applyStyles('dark', {
          color: 'inherit',
        }),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));
 

const Comment = ({
  
  comment,
 
}) => { 

   const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [editMode, setEditMode] = useState(false);
  
  const inputRef = useRef(null);
 
 
  
   

  return (
    <div>
    
            
      <Box>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
              <Box display={"flex"}   gap={"10px"} >
                      <Avatar alt={ comment?.userName} src= {getimageUrl(comment?.userImage)}  /> 
                      <Box>
                    <Typography variant="h5"> { comment?.userName}</Typography>
                    <Typography variant="h6" sx={{ color: colors.primary[300], }}> {formatTimestamp(comment?.createdAt)   }</Typography>

                      </Box>
              </Box>
              <Button   onClick={() => { navigate(`/Video/${comment.courseId}/${comment.videoId}`) }} variant="contained" sx={{backgroundColor:colors.blue[100], width:"fit-content", color:colors.white[100], fontSize:"10px"  }}>go to the video</Button>
                                           
        </Box>
        
        <Box sx={{
            minHeight: "60px", p: "10px", m: "13px 0", borderRadius: "6px", backgroundColor: colors.primary[100],
            position: "relative",
            "&::before": {
                content: '""',
                position: "absolute",
                borderStyle: "solid",
                borderWidth: "15px",
                borderColor: ` transparent  transparent ${colors.primary[100]}`,
                top: "-24px",
                left:"5px"
                
            }
          }}>
                <Typography
                   contentEditable={editMode}
              suppressContentEditableWarning={editMode}
              ref={inputRef}
              style={{ wordWrap: "break-word" }}
                  variant="body1">
                {comment.text}
                </Typography>
  
        </Box>
      </Box>

       <Divider sx={{ margin: "15px 0px" }} />
       
 
    </div>
  );
};

/* 

  {comment?.items?.map((cmnt) => (
          <Comment
            key={cmnt.id}
            comment={cmnt}
          />
        ))}
 */
 

 
function buildCommentTree(comments) {
  const map = {};
  const roots = [];

  comments.forEach((c) => {
    map[c.id] = { ...c, items: [] };
  });

  comments.forEach((c) => {
    if (c.parentId) {
      map[c.parentId]?.items.push(map[c.id]);
    } else {
      roots.push(map[c.id]);
    }
  });

  return {
    id: 1,
    items: roots,
  };
}

const  UserComments = ({ data   }) => { UserComments
  
   
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    
  return (
    <>
       <Typography variant="h3">{data.length} Comments</Typography>
              <Divider sx={{ margin: "15px 0px" }} />
        <Box
        sx={{
            backgroundColor: colors.primary[200],
                p: "15px",
                display: "flex",
                flexDirection: "column",
            gap:"15px"
            }} >

              {
                data.map((comment) => (
                  <Comment key={comment.id} comment={comment} />
                ))

              }
             
             
        </Box>
    </>
    )
}



export default UserComments;