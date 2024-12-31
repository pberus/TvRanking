import PropTypes from "prop-types";
import Card from "../Card/card";
import style from "./homeCarousel.module.css";

const HomeCarousel = ({ tvArray, position }) => {
  return (
    <div className={style.color}>
      <div id={`carouselExampleIndicators${position}`} className='carousel slide'>
        <div className='carousel-indicators'>
          <button
            type='button'
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to='0'
            className='active'
            aria-current='true'
            aria-label='Slide 1'
          ></button>
          <button
            type='button'
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to='1'
            aria-label='Slide 2'
          ></button>
          <button
            type='button'
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to='2'
            aria-label='Slide 3'
          ></button>
          <button
            type='button'
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to='3'
            aria-label='Slide 4'
          ></button>
        </div>
        <div className='carousel-inner'>
          <div className='carousel-item active'>
            <div className='row'>
              {tvArray.slice(0, 5).map((tv) => (
                <div key={tv.id} className={`col ${style.card}`}>
                  <Card tv={tv} />
                </div>
              ))}
            </div>
          </div>
          <div className='carousel-item'>
            <div className='row'>
              {tvArray.slice(5, 10).map((tv) => (
                <div key={tv.id} className={`col ${style.card}`}>
                  <Card tv={tv} />
                </div>
              ))}
            </div>
          </div>
          <div className='carousel-item'>
            <div className='row'>
              {tvArray.slice(10, 15).map((tv) => (
                <div key={tv.id} className={`col ${style.card}`}>
                  <Card tv={tv} />
                </div>
              ))}
            </div>
          </div>
          <div className='carousel-item'>
            <div className='row'>
              {tvArray.slice(15, 20).map((tv) => (
                <div key={tv.id} className={`col ${style.card}`}>
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
