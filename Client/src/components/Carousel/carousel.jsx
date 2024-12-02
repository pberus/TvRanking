import PropTypes from "prop-types";
import Card from "../Card/card";
import style from "./carousel.module.css";

const Carousel = ({ tvArray }) => {
  return (
    <div className={style.color}>
      <div
        id='carouselExampleControls'
        className='carousel slide'
        data-ride='carousel'
      >
        <div className='carousel-inner'>
          <div className="carousel-item active">
            <div className='row'>
              {tvArray.slice(0, 5).map((tv) => (
                <div key={tv.id} className={`col ${style.card}`}>
                  <Card tv={tv} />
                </div>
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className='row'>
              {tvArray.slice(5, 10).map((tv) => (
                <div key={tv.id} className={`col ${style.card}`}>
                  <Card tv={tv} />
                </div>
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className='row'>
              {tvArray.slice(10, 15).map((tv) => (
                <div key={tv.id} className={`col ${style.card}`}>
                  <Card tv={tv} />
                </div>
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className='row'>
              {tvArray.slice(15, 20).map((tv) => (
                <div key={tv.id} className={`col ${style.card}`}>
                  <Card tv={tv} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <a
          className='carousel-control-prev'
          href='#carouselExampleControls'
          role='button'
          data-slide='prev'
        >
          <span
            className='carousel-control-prev-icon'
            aria-hidden='true'
          ></span>
          <span className='sr-only'>Previous</span>
        </a>
        <a
          className='carousel-control-next'
          href='#carouselExampleControls'
          role='button'
          data-slide='next'
        >
          <span
            className='carousel-control-next-icon'
            aria-hidden='true'
          ></span>
          <span className='sr-only'>Next</span>
        </a>
      </div>
    </div>
  );
};

Carousel.propTypes = {
  tvArray: PropTypes.array.isRequired,
};

export default Carousel;
