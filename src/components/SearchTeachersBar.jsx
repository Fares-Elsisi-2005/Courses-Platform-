import {   InputBase, IconButton, List, ListItem,Avatar,Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { useTeacherUserSearchIndex } from "../hooks/useTeacherUserSearchIndex";

import { getimageUrl } from "./../services/serviceProvider";
 

const SearchTeachersBar = ( ) => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);

    const { Teachers } = useTeacherUserSearchIndex();
    
  const fuse = useMemo(() => {
    return new Fuse(Teachers, {
      keys: ["name"],
      threshold: 0.3,
    });
  }, [Teachers]);

  const handleChange = (e) => {
    const v = e.target.value;
    setValue(v);

    if (!v.trim()) {
      setResults([]);
      return;
    }

    const res = fuse.search(v).slice(0, 6).map(r => r.item);
    setResults(res);
  };

  const handleSubmit = () => {
    if (!value.trim()) return;
    navigate(`/Teachers`);
    setResults([]);
  };

  return (
    
      
          <>
            <InputBase
            sx={{ ml: 2, flex: 1 }}
            placeholder="Search tutors.."
            value={value}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />

          <IconButton type="button" sx={{ p: 1 }} onClick={handleSubmit}>
            <SearchIcon />
          </IconButton>

          {/* Suggestions dropdown */}
          {results.length > 0 && (
            <List
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                bgcolor: "background.paper",
                zIndex: 10,
                maxHeight: 300,
                overflow: "auto",
              }}
            >
              {results.map((Teacher) => (
                <ListItem
                  button
                  key={Teacher.id}
                      onClick={() => { navigate(`/UserProfile/${Teacher.id}`) }}
                      sx={{
                          display: "flex",
                          gap:"10px"
                      }}
                  >
                       
                                   <Avatar alt="Ardit korko" src= {getimageUrl(Teacher?.image)}  /> 
                                   
                                    <Typography variant="h5">{Teacher?.name}</Typography>
                                        
                                 
                             
                  
                </ListItem>
              ))}
            </List>
          )}
          </>
        
      
    
  );
};

export default SearchTeachersBar;