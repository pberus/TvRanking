import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

function valuetext(value) {
  return `Min ${value}`;
}

export default function Runtime({
  filmsOrSeries,
  onRuntimeChange,
  reset,
  setReset,
}) {
  const MAX = filmsOrSeries === "films" ? 300 : 90;
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

  const [val, setVal] = React.useState([MIN, MAX]);
  const handleChange = (_, newValue) => {
    if (JSON.stringify(newValue) === JSON.stringify([MIN, MAX])) {
      onRuntimeChange("runtime", []);
    } else {
      onRuntimeChange("runtime", newValue);
    }
  };

  React.useEffect(() => {
    if (reset) {
      setVal([MIN, MAX]);
      onRuntimeChange("runtime", []);
      setReset(false);
    }
  }, [onRuntimeChange, reset, setReset, MAX]);

  return (
    <Box sx={{ width: 300, margin: 2 }}>
      <Slider
        marks={marks}
        step={5}
        value={val}
        valueLabelDisplay='auto'
        min={MIN}
        max={MAX}
        onChange={(_, newValue) => setVal(newValue)}
        onChangeCommitted={handleChange}
        getAriaLabel={() => "Runtime range"}
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

Runtime.propTypes = {
  filmsOrSeries: PropTypes.string.isRequired,
  onRuntimeChange: PropTypes.func.isRequired,
  reset: PropTypes.bool.isRequired,
  setReset: PropTypes.func.isRequired,
};
