import PropTypes from "prop-types";
import noImageAvailable from "../../assets/no_image_available.jpg";
import DetailSeasonsModal from "../Modal/detailSeasons";
import { useState } from "react";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const DetailSeasonsCarousel = ({ seasons }) => {
  const [open, setOpen] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(null);

  const handleOpenModal = (season) => {
    setSelectedSeason(season);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedSeason(null);
  };

  const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const seasonsChunks = chunkArray(seasons, 8); // Divide el array en grupos de 6

  return (
    <div className='mt-2 border p-3'>
      <div id='carouselExample' className='carousel slide'>
        <div className='carousel-inner'>
          {seasonsChunks.map((chunk, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div className='d-flex'>
                {chunk.map((season, i) => (
                  <div
                    key={i}
                    className='text-center'
                    style={{
                      width: "150px", // Ancho de la tarjeta
                      height: "250px", // Alto de la tarjeta
                      overflow: "hidden",
                      margin: "0 5px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleOpenModal(season)} // Abre el modal
                  >
                    <img
                      src={
                        season.poster_path
                          ? IMAGE_URL + season.poster_path
                          : noImageAvailable
                      }
                      className='d-block w-100 rounded'
                      alt={`image of ${season.name}`}
                    />
                    <p>
                      <strong>{season.name}</strong>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          className='carousel-control-prev w-auto bg-secondary'
          type='button'
          data-bs-target='#carouselExample'
          data-bs-slide='prev'
        >
          <span
            className='carousel-control-prev-icon'
            aria-hidden='true'
          ></span>
          <span className='visually-hidden'>Previous</span>
        </button>
        <button
          className='carousel-control-next w-auto bg-secondary'
          type='button'
          data-bs-target='#carouselExample'
          data-bs-slide='next'
        >
          <span
            className='carousel-control-next-icon'
            aria-hidden='true'
          ></span>
          <span className='visually-hidden'>Next</span>
        </button>
      </div>
      <DetailSeasonsModal
        open={open}
        handleClose={handleCloseModal}
        season={selectedSeason}
      />
    </div>
  );
};

DetailSeasonsCarousel.propTypes = {
  seasons: PropTypes.array.isRequired,
};

export default DetailSeasonsCarousel;
