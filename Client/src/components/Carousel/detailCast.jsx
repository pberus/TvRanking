import PropTypes from "prop-types";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const DetailCastCarousel = ({ cast }) => {
  const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const castChunks = chunkArray(cast, 6); // Divide el array en grupos de 6

  return (
    <div className='bg-dark'>
      <div id='carouselExample' className='carousel slide'>
        <div className='carousel-inner'>
          {castChunks.map((chunk, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div className='d-flex justify-content-around'>
                {chunk.map((actor, i) => (
                  <div key={i} className='text-center text-light'>
                    <p>
                      <strong>{actor.name}</strong>
                    </p>
                    <p>{actor.character}</p>
                    <img
                      src={IMAGE_URL + actor.image}
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
          className='carousel-control-prev w-auto'
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
          className='carousel-control-next w-auto'
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
