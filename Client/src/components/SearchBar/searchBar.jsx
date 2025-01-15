import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/buscar?query=${searchTerm}`);
    }
  };

  return (
    <div>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <TextField
          id='input-with-icon-textfield'
          type='search'
          placeholder='Buscar peliculas y series de TV.'
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
              autoComplete: "off",
            },
          }}
          variant='filled'
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </Box>
    </div>
  );
};

export default SearchBar;
