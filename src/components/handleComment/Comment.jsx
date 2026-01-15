import { useState, useRef, useEffect } from "react";

 import { useAuth } from "../../Contexts/AuthContext";
import Action from "./Action";
import {useTheme, Box,Button ,Typography,InputBase,IconButton ,Divider,Avatar,TextField ,TextareaAutosize  } from "@mui/material";
import { tokens } from "../../theme";
import DownArrow from "../../assets/down-arrow.svg?react";
import UpArrow from "../../assets/up-arrow.svg?react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
 import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit'; 
import DeleteIcon from '@mui/icons-material/Delete';
import {formatTimestamp,getimageUrl } from "../../services/serviceProvider";
 

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
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
  comment,
  commentLength,
  loading  ,
  error 
}) => { 

   const { user } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const [isAllowComment, setIsAllowComment] = useState(input.length > 0);
  const inputRef = useRef(null);

  // new style
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

 useEffect(() => {
  if (comment.id === 1) {
    setExpand(true); // show all top-level comments
  }
}, [comment.id]);
  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);

  const handleNewComment = () => {
    setExpand((prev) => !prev);
    setShowInput(true);
  };

  const onAddComment = () => {
    if (editMode) {
      
      handleEditNode(comment.id, inputRef?.current?.innerText || "");
    } else {
      setExpand(true);
      handleInsertNode(comment , input);//here
      
      setShowInput(false);
      setInput("");
    }

    if (editMode) setEditMode(false);
  };

  const handleDelete = () => {
    handleDeleteNode(comment.id);
  };

  return (
    <div>
      <div className={comment.id === 1 ? "inputContainer" : "commentContainer"}>
        {comment.id === 1 ? (
          <>
            <Box width={"100%"}>


              <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    mb:"20px"
                     
               }}>
                     
               
                
                
                      <Box display="flex" alignItems="center" gap={1}>
        <Avatar sx={{ width: isAllowComment?32:24, height:isAllowComment?32:24 }} src= {user?.user?.image} />

                  <InputBase
                    autoFocus 
          fullWidth
          placeholder="Enter your comment"
                    value={input}
                    onClick={()=>{setIsAllowComment(true)}}
          onChange={(e) => setInput(e.target.value)}
          sx={{
            fontSize: 14,
            px: 1,
            py: 0.5,
            borderBottom: "1px solid #ccc",
          }}
        />
      </Box>
                
                
                <Box sx={{  gap: "10px", alignSelf: "flex-end", display:isAllowComment?"flex":"none" }}>
                  
                  <Button variant="outlined" 
                  onClick={ ()=>{setIsAllowComment(false)}}
                  
                  sx={{
                     
                                   width:"fit-content", 
                                   color:colors.white[100],
                                   textTransform:"capitalize",
                                   "&:hover":{
                                   backgroundColor:colors.primary[100]
                                   },
                    transition: "all 0.3s",
                                   
                    }}>Cancel</Button>
                  
                   <Button variant="contained" 
                  onClick={onAddComment}
                  disabled={input.length === 0}
                    sx={{ 
                    
                    backgroundColor: colors.purple[500] ,
                                   width:"fit-content", 
                                   color:colors.white[100],
                                   textTransform:"capitalize",
                                   "&:hover":{
                                   backgroundColor:   colors.purple[600] 
                                   },
                    transition: "all 0.3s",
                                   
                              }}>Add Comment</Button>
                </Box>
                 
            </Box>

               
            </Box>
            
            
          </>
        ) : (
          
            
             <Box>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                  <Box display={"flex"}   gap={"10px"} >
                      <Avatar alt="Ardit korko" src= {getimageUrl(comment?.userImage)}  /> 
                      <Box>
                    <Typography variant="h5"> { comment?.userName}</Typography>
                    <Typography variant="h6" sx={{ color: colors.primary[300], }}> {formatTimestamp(comment?.createdAt)   }</Typography>

                      </Box>
                </Box>
                {comment.userId == user.user.userId ?
                  <Box>
            
                      <IconButton
                      id="demo-customized-button"
                      aria-controls={open ? 'demo-customized-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      variant="contained"
                      disableElevation
                      onClick={handleClick}
                  >
                      <MoreVertIcon />
            </IconButton>
            
                      <StyledMenu
                              id="demo-customized-menu"
                              slotProps={{
                              list: {
                                  'aria-labelledby': 'demo-customized-button',
                              },
                              }}
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                          >
                      <MenuItem onClick={() => { setEditMode(true); handleClose() }} disableRipple>
                              <EditIcon />
                              Edit
                              </MenuItem>
                          
                      <MenuItem onClick={() => { handleDelete(); handleClose(); }} disableRipple>
                                      <DeleteIcon />
                                      delete
                              </MenuItem>
              
                      </StyledMenu>
                  </Box>:null
                }
          
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

                 <div style={{ display: "flex", marginTop: "5px", gap: "6px" }}>
              {editMode ? (
                <>
                  <Action
                    className="reply"
                    type="SAVE"
                    handleClick={onAddComment}
                  />
                  <Action
                    className="reply"
                    type="CANCEL"
                    handleClick={() => {
                      if (inputRef.current)
                        inputRef.current.innerText = comment.text;
                      setEditMode(false);

                    }}
                  />
                </>
              ) : (
                <>
                  <Action
                    className="reply"
                    type={
                      <> {expand ? <UpArrow style={{ color: colors.primary[300], width: "10px", height: "10px" }} /> : <DownArrow style={{ color: colors.primary[300], width: "10px", height: "10px" }} />} {" "} {comment?.items?.length} Reply</>
                      
                       
                       
                    }
                    handleClick={handleNewComment}
                      />
                 
                </>
              )}
                </div>
                
                 <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
        {showInput && (
          <div className="inputContainer">
            <input
              type="text"
              className="inputContainer__input"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
                      <Box    display={"flex"} alignSelf={"flex-end"}>
                        <Action className="reply" type="REPLY" handleClick={onAddComment} />
            <Action
              className="reply"
              type="CANCEL"
              handleClick={() => {
                setShowInput(false);
                if (!comment?.items?.length) setExpand(false);
              }}
            />
            </Box>
          </div>
        )}</div>

        </Box>
      </Box>
        )}


         
      </div>

      <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
         

        {comment?.items?.map((cmnt) => (
          <Comment
            key={cmnt.id}
            handleInsertNode={handleInsertNode}
            handleEditNode={handleEditNode}
            handleDeleteNode={handleDeleteNode}
            comment={cmnt}
          />
        ))}
      </div>


      
    </div>
  );
};

export default Comment;

 


           /* <>
                        <img
                        src={expand ? UpArrow : DownArrow}
                        width={10}
                        height={10}
                        alt=""
                        style={{ marginRight: 4,color:colors.primary[300] }}
                        
                      /> */