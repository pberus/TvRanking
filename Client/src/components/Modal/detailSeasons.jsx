import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import noImageAvailable from "../../assets/no_image_available.jpg";
import tmdbIcono from "../../assets/tmdb-logo.svg";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxHeight: "90vh", // Limita la altura máxima al 90% de la ventana
  overflowY: "auto", // Habilita el scroll vertical si el contenido excede la altura
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DetailSeasonsModal({ open, handleClose, season }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div className='d-flex justify-content-between'>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              {season?.name}
            </Typography>
            <button
              onClick={handleClose}
              className='bg-transparent border-0 text-secondary'
            >
              {<CloseIcon />}
            </button>
          </div>
          <div
            style={{
              width: "450px", // Ancho de la tarjeta
              height: "250px", // Alto de la tarjeta
              marginTop: "10px",
              display: "flex",
            }}
          >
            <img
              src={
                season?.poster_path
                  ? IMAGE_URL + season.poster_path
                  : noImageAvailable
              }
              className='d-block w-40 rounded me-2'
              alt={`image of ${season?.name}`}
            />
            <div>
              {season?.air_date && (
                <p className='m-1'>
                  <b>Fecha de estreno: </b>{" "}
                  {new Date(season.air_date + "T00:00:00").toLocaleDateString(
                    "es-AR"
                  )}
                </p>
              )}
              {season?.episode_count && (
                <p className='m-1'>
                  <b>Episodios: </b> {season?.episode_count}
                </p>
              )}
              {season?.vote_average && (
                <p className='m-1'>
                  <b>Calificación: </b> {season?.vote_average}
                  <img
                    src={tmdbIcono}
                    alt='tmdb-logo'
                    width='60'
                    className='ms-2'
                  />
                </p>
              )}
            </div>
          </div>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {season?.overview}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

DetailSeasonsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  season: PropTypes.object,
};
