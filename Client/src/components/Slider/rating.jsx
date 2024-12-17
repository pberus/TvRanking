import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

function valuetext(value) {
  return `Rating ${value}`;
}

const MAX = 10;
const MIN = 0;
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

export default function Rating({ onRatingChange, reset, setReset }) {
  const [val, setVal] = React.useState([MIN, MAX]);
  const handleChange = (_, newValue) => {
    setVal(newValue);
    onRatingChange("rating", newValue);
  };

  React.useEffect(() => {
    if (reset) {
      setVal([MIN, MAX]);
      onRatingChange("rating", []);
      setReset(false);
    }
  }, [onRatingChange, reset, setReset]);

  return (
    <Box sx={{ width: 300, margin: 2 }}>
      <Slider
        marks={marks}
        step={0.1}
        value={val}
        valueLabelDisplay='auto'
        min={MIN}
        max={MAX}
        onChange={handleChange}
        getAriaLabel={() => "Rating range"}
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

Rating.propTypes = {
  onRatingChange: PropTypes.func.isRequired,
  reset: PropTypes.bool.isRequired,
  setReset: PropTypes.func.isRequired,
};
