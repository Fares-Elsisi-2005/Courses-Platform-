import {useTheme, Box,Button ,Typography,IconButton  ,Divider,Avatar,TextField ,TextareaAutosize  } from "@mui/material";
import { tokens } from "../../theme";
 
import { useState,useMemo,useEffect } from "react";
 
import useNode from "../../hooks/useNode"
import "./styleComments.css";
import Comment from "./Comment";

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

const Comments = ({ data ,loading, error, addComment, editComment, deleteComment  }) => {
  
  const treeData = useMemo(() => buildCommentTree(data), [data]);
   
  const [commentsData, setCommentsData] = useState(treeData );

   useEffect(() => {
  setCommentsData(treeData);
   }, [treeData]);
  
    const { insertNode, editNode, deleteNode } = useNode();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
  const handleInsertNode = (comment, input) => {
      console.log("comment:",comment);
      console.log("input:",input);
   
   
    addComment({
      text: input,
      parentId: comment.id === 1 ? null : comment.id
    });



  };

  const handleEditNode = (folderId, value) => {
   /*  const finalStructure = editNode(commentsData, folderId, value);
    setCommentsData(finalStructure); */
    console.log("folderId", folderId)
    console.log("value", value)
    editComment( folderId, value)
  };

  const handleDeleteNode = (folderId) => {
    
    deleteComment(folderId);
  };


    
  return (
    <>
       <Typography variant="h3">{commentsData.items.length} Comments</Typography>
              <Divider sx={{ margin: "15px 0px" }} />
        <Box
        sx={{
            backgroundColor: colors.primary[200],
                p: "15px",
                display: "flex",
                flexDirection: "column",
            gap:"15px"
            }} >
            <Comment
        handleInsertNode={handleInsertNode}
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode}
          comment={commentsData}
          commentLength={commentsData.items.length}
          loading={loading}
          error={error}
      />
             
            
            
             
        </Box>
    </>
    )
}



export default Comments;