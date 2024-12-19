import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

function valuetext(value) {
  return `Year ${value}`;
}

const MAX = new Date().getFullYear();
const MIN = 1874;
const marks = [
  {
    value: MIN,
    label: "",
  },
  {
    value: MAX,
    label: "",
  },
];

export default function YearRelease({ onYearChange, reset, setReset }) {
  const [val, setVal] = React.useState([MIN, MAX]);
  const handleChange = (_, newValue) => {
    if (JSON.stringify(newValue) === JSON.stringify([MIN, MAX])) {
      onYearChange("yearRange", []);
    } else {
      onYearChange("yearRange", newValue);
    }
  };

  React.useEffect(() => {
    if (reset) {
      setVal([MIN, MAX]);
      onYearChange("yearRange", []);
      setReset(false);
    }
  }, [onYearChange, reset, setReset]);

  return (
    <Box sx={{ width: 300, margin: 2 }}>
      <Slider
        marks={marks}
        step={1}
        value={val}
        valueLabelDisplay='auto'
        min={MIN}
        max={MAX}
        onChange={(_, newValue) => setVal(newValue)}
        onChangeCommitted={handleChange}
        getAriaLabel={() => "Release year range"}
        getAriaValueText={valuetext}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant='body2'
          onClick={() => setVal(MIN)}
          sx={{ cursor: "pointer" }}
        >
          {MIN}
        </Typography>
        <Typography
          variant='body2'
          onClick={() => setVal(MAX)}
          sx={{ cursor: "pointer" }}
        >
          {MAX}
        </Typography>
      </Box>
    </Box>
  );
}

YearRelease.propTypes = {
  onYearChange: PropTypes.func.isRequired,
  reset: PropTypes.bool.isRequired,
  setReset: PropTypes.func.isRequired,
};
