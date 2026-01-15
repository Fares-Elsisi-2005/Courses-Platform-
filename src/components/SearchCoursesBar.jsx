import { Box, InputBase, IconButton, List, ListItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { useCourseSearchIndex } from "../hooks/useCourseSearchIndex";

const SearchCoursesBar = ( ) => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);

    const { courses } = useCourseSearchIndex();
     
  const fuse = useMemo(() => {
    return new Fuse(courses, {
      keys: ["title"],
      threshold: 0.3,
    });
  }, [courses]);

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
    navigate(`/courses`);
    setResults([]);
  };

  return (
    
      
          <>
            <InputBase
            sx={{ ml: 2, flex: 1 }}
            placeholder="Search Courses.."
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
              {results.map((c) => (
                <ListItem
                  button
                  key={c.id}
                  onClick={() => navigate(`/course/${c.id}`)}
                >
                  {c.title}
                </ListItem>
              ))}
            </List>
          )}
          </>
        
      
    
  );
};

export default SearchCoursesBar;