import PropTypes from "prop-types";
import style from "./detailImages.module.css";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const DetailImagesCarousel = ({ images }) => {
  return (
    <div
      id='carouselExampleIndicators'
      className='carousel slide carousel-fade'
      data-bs-ride='carousel'
      data-bs-interval='2000'
    >
      <div className='carousel-indicators'>
        {images.map((_, index) => (
          <button
            key={index}
            type='button'
            data-bs-target='#carouselExampleIndicators'
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : undefined}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <div className='carousel-inner'>
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img
              src={IMAGE_URL + image}
              className={`d-block w-100 ${style.img}`}
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <button
        className='carousel-control-prev'
        type='button'
        data-bs-target='#carouselExampleIndicators'
        data-bs-slide='prev'
      >
        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
        <span className='visually-hidden'>Previous</span>
      </button>
      <button
        className='carousel-control-next'
        type='button'
        data-bs-target='#carouselExampleIndicators'
        data-bs-slide='next'
      >
        <span className='carousel-control-next-icon' aria-hidden='true'></span>
        <span className='visually-hidden'>Next</span>
      </button>
    </div>
  );
};

DetailImagesCarousel.propTypes = {
  images: PropTypes.array.isRequired,
};

export default DetailImagesCarousel;
