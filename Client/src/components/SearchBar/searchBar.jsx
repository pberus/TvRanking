import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Popover from "@mui/material/Popover";
import { Typography } from "@mui/material";
import { LiveTv, Movie } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { removePopoverResults, searchTvPopover } from "../../redux/actions";
import noImageAvailable from "../../assets/no_image_available.jpg";
import tmdbIcono from "../../assets/tmdb-logo.svg";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchPopoverResults = useSelector(
    (state) => state.searchPopoverResults
  );

  const [typingTimeout, setTypingTimeout] = useState(null); // Estado para manejar el temporizador

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);

    if (value.trim() === "") {
      if (typingTimeout) {
        clearTimeout(typingTimeout); // Cancela la búsqueda pendiente
      }
      dispatch(removePopoverResults());
      return;
    }

    // Si hay un temporizador anterior, lo cancelamos
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Establecemos un nuevo temporizador que actualizará el estado después de 300 ms
    const timeout = setTimeout(() => {
      dispatch(searchTvPopover(value));
    }, 300);

    // Guardamos el nuevo temporizador
    setTypingTimeout(timeout);
  };

  useEffect(() => {
    // Limpiar el temporizador si el componente se desmonta
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/buscar?query=${searchTerm}`);
      setAnchorEl(null); // Cierra el popover después de buscar
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Abre el popover al hacer clic
  };

  const handleClose = () => {
    setAnchorEl(null); // Cierra el popover al hacer clic fuera
  };

  const open = Boolean(anchorEl);
  const id = open ? "search-popover" : undefined;

  return (
    <div>
      <Box sx={{ "& > :not(style)": { m: 1, border: 1, borderRadius: 1 } }}>
        <TextField
          id='input-with-icon-textfield'
          type='search'
          placeholder='Buscar películas y series de TV...'
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onClick={handleClick} // Abre el popover al hacer clic
          autoComplete='off'
          variant='outlined'
          color='dark'
          focused
          sx={{
            input: { color: "white" }, // Color del texto
            "& .MuiInputBase-input::placeholder": {
              color: "dark",
              opacity: 0.5,
            }, // Color del placeholder
            "& .MuiFilledInput-root": {
              backgroundColor: "transparent", // Fondo transparente
            },
            "& .MuiFilledInput-underline:before": {
              borderBottom: "1px solid white", // Borde blanco
            },
            "& .MuiFilledInput-underline:hover:before": {
              borderBottom: "2px solid white", // Borde al pasar el mouse
            },
            "& .MuiFilledInput-underline:after": {
              borderBottom: "2px solid white", // Borde activo
            },
            backgroundColor: "trasparent",
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon sx={{ color: "white" }} />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        disableAutoFocus
        disableEnforceFocus
      >
        <Box sx={{ p: 2, width: "700px", maxHeight: "85vh" }}>
          {searchPopoverResults &&
          !Object.keys(searchPopoverResults).length > 0 ? (
            <div>
              <h4 className='text-center'>¿Que queres buscar?</h4>
            </div>
          ) : (
            <div>
              <div className='w-100 d-flex gap-1'>
                <div className='w-50'>
                  <Typography
                    variant='overline'
                    color='gray'
                    sx={{ display: "flex" }}
                  >
                    <Movie />
                    <span className='ps-1'>Peliculas</span>
                  </Typography>
                  {searchPopoverResults.movies.length > 0 ? (
                    searchPopoverResults.movies.map((mov, index) => (
                      <Link
                        key={mov.id}
                        to={`/pelicula/${
                          mov.title &&
                          mov.title
                            .toLowerCase()
                            .replace(/[\s]+/g, "-")
                            .replace(/[^a-z0-9áéíóúüñ-]+/gi, "")
                        }-${
                          mov.release_date && mov.release_date.split("-")[0]
                        }`}
                        style={{ textDecoration: "none", color: "inherit" }}
                        onClick={handleClose}
                      >
                        <div
                          className={`d-flex border-bottom pb-2 pt-2 ${
                            index === 0 && "border-top"
                          }`}
                          style={{ height: "150px", overflow: "hidden" }}
                        >
                          <img
                            className='w-25 pe-2'
                            src={
                              mov.poster_path
                                ? IMAGE_URL + mov.poster_path
                                : noImageAvailable
                            }
                            alt={mov.title}
                          />
                          <div className='d-flex flex-column justify-content-between'>
                            <div>
                              <h5>
                                {mov.title}{" "}
                                <span className='text-secondary'>
                                  (
                                  {mov.release_date &&
                                    mov.release_date.split("-")[0]}
                                  )
                                </span>
                              </h5>
                              <p className='text-secondary'>
                                Titulo original: {mov.original_title}
                              </p>
                            </div>
                            <div>
                              <img
                                src={tmdbIcono}
                                alt='tmdb-logo'
                                width='60'
                                className='me-2'
                              />
                              {mov.vote_average && mov.vote_average.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <h6 className='pt-2 ps-1'>No hay resultados</h6>
                  )}
                </div>
                <div className='w-50'>
                  <Typography
                    variant='overline'
                    color='gray'
                    sx={{ display: "flex" }}
                  >
                    <LiveTv />
                    <span className='ps-1'>Series</span>
                  </Typography>
                  {searchPopoverResults.series.length > 0 ? (
                    searchPopoverResults.series.map((ser, index) => (
                      <Link
                        key={ser.id}
                        to={`/serie/${
                          ser.name &&
                          ser.name
                            .toLowerCase()
                            .replace(/[\s]+/g, "-")
                            .replace(/[^a-z0-9áéíóúüñ-]+/gi, "")
                        }-${
                          ser.first_air_date && ser.first_air_date.split("-")[0]
                        }`}
                        style={{ textDecoration: "none", color: "inherit" }}
                        onClick={handleClose}
                      >
                        <div
                          className={`d-flex border-bottom pb-2 pt-2 ${
                            index === 0 && "border-top"
                          }`}
                          style={{ height: "150px" }}
                        >
                          <img
                            className='w-25 pe-2'
                            src={
                              ser.poster_path
                                ? IMAGE_URL + ser.poster_path
                                : noImageAvailable
                            }
                            alt={ser.name}
                          />
                          <div className='d-flex flex-column justify-content-between'>
                            <div>
                              <h5>
                                {ser.name}{" "}
                                <span className='text-secondary'>
                                  (
                                  {ser.first_air_date &&
                                    ser.first_air_date.split("-")[0]}
                                  )
                                </span>
                              </h5>
                              <p className='text-secondary'>
                                Titulo original: {ser.original_name}
                              </p>
                            </div>
                            <div>
                              <img
                                src={tmdbIcono}
                                alt='tmdb-logo'
                                width='60'
                                className='me-2'
                              />
                              {ser.vote_average && ser.vote_average.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <h6 className='pt-2 ps-1'>No hay resultados</h6>
                  )}
                </div>
              </div>
              {(searchPopoverResults.movies.length !== 0 ||
                searchPopoverResults.series.length !== 0) && (
                <div className='d-flex justify-content-center p-3'>
                  <h6>
                    <a
                      href={`/buscar?query=${searchTerm}`}
                      className='text-center'
                    >
                      Ver mas resultados de {searchTerm}...
                    </a>
                  </h6>
                </div>
              )}
            </div>
          )}
        </Box>
      </Popover>
    </div>
  );
};

export default SearchBar;
