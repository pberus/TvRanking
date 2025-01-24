import PropTypes from "prop-types";
import Card from "../Card/Card";

const DetailSimilarCarousel = ({ similar }) => {
  const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const similarChunks = chunkArray(similar, 6); // Divide el array en grupos de 6

  return (
    <div className='bg-dark'>
      <div id='carouselExample' className='carousel slide'>
        <div className='carousel-inner'>
          {similarChunks.map((chunk, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div className='d-flex justify-content-around'>
                {chunk.map((similar, i) => (
                  <div key={i}>
                    <Card tv={similar} />
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
    </div>
  );
};

DetailSimilarCarousel.propTypes = {
  similar: PropTypes.array.isRequired,
};

export default DetailSimilarCarousel;
