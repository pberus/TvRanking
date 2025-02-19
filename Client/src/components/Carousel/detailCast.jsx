import PropTypes from "prop-types";
import noImageAvailable from "../../assets/no_image_available.jpg";
import { useEffect, useState } from "react";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const DetailCastCarousel = ({ cast }) => {
  const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const updateVisibleCount = () => {
      let count;
      if (window.innerWidth <= 425) {
        count = 1;
      } else if (window.innerWidth <= 600) {
        count = 2;
      } else if (window.innerWidth <= 768) {
        count = 3;
      } else if (window.innerWidth <= 1024) {
        count = 4;
      } else if (window.innerWidth <= 1200) {
        count = 5;
      } else {
        count = 6;
      }
      setVisibleCount(count);
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const castChunks = chunkArray(cast, visibleCount); // Divide el array en grupos de 6

  return (
    <div className='mt-2'>
      <div id='carouselExample' className='carousel slide'>
        <div className='carousel-inner'>
          {castChunks.map((chunk, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div className='d-flex justify-content-around'>
                {chunk.map((actor, i) => (
                  <div
                    key={i}
                    className='text-center d-flex flex-column justify-content-between'
                  >
                    <p>
                      <strong>{actor.name}</strong>
                    </p>
                    <p>{actor.character}</p>
                    <img
                      src={
                        actor.image ? IMAGE_URL + actor.image : noImageAvailable
                      }
                      className='d-block w-100'
                      alt={`image of ${actor.name}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          className='carousel-control-prev w-auto bg-secondary-subtle'
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
          className='carousel-control-next w-auto bg-secondary-subtle'
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
    </div>
  );
};

DetailCastCarousel.propTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      character: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DetailCastCarousel;
