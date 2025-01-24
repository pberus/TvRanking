import PropTypes from "prop-types";
import Card from "../Card/Card";
import style from "./homeCarousel.module.css";

const HomeCarousel = ({ tvArray, position }) => {
  return (
    <div className={style.color}>
      <div
        id={`carouselExampleIndicators${position}`}
        className='carousel slide'
      >
        <div className='carousel-inner'>
          <div className='carousel-item active'>
            <div className='d-flex justify-content-center gap-1'>
              {tvArray.slice(0, 6).map((tv) => (
                <div key={tv.id}>
                  <Card tv={tv} />
                </div>
              ))}
            </div>
          </div>
          <div className='carousel-item'>
            <div className='d-flex justify-content-center gap-1'>
              {tvArray.slice(6, 12).map((tv) => (
                <div key={tv.id}>
                  <Card tv={tv} />
                </div>
              ))}
            </div>
          </div>
          <div className='carousel-item'>
            <div className='d-flex justify-content-center gap-1'>
              {tvArray.slice(12, 18).map((tv) => (
                <div key={tv.id}>
                  <Card tv={tv} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          className='carousel-control-prev w-auto'
          type='button'
          data-bs-target={`#carouselExampleIndicators${position}`}
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
          data-bs-target={`#carouselExampleIndicators${position}`}
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

HomeCarousel.propTypes = {
  tvArray: PropTypes.array.isRequired,
  position: PropTypes.string.isRequired,
};

export default HomeCarousel;
