import PropTypes from "prop-types";
import Card from "../Card/card";
import style from "./carousel.module.css";

//const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const Carousel = ({ tvArray }) => {
  return (
    <div className={style.color}>
      <div className={style.Cards}>
        {tvArray?.map((tv) => (
          <Card key={tv.id} tv={tv} />
        ))}
      </div>
      <div
        id='carouselExampleControls'
        className='carousel slide'
        data-ride='carousel'
      >
        <div className='carousel-inner'>
          <div className="carousel-item active">
            <div className='row justify-content-between'>
              <div className='col-3'>
                <Card key={tvArray[0].id} tv={tvArray[0]} />
              </div>
              <div className='col-3'>
                <Card key={tvArray[1].id} tv={tvArray[1]} />
              </div>
              <div className='col-3'>
                <Card key={tvArray[2].id} tv={tvArray[2]} />
              </div>
              <div className='col-3'>
                <Card key={tvArray[3].id} tv={tvArray[3]} />
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className='row justify-content-between'>
              <div className='col-3'>
                <Card key={tvArray[0].id} tv={tvArray[0]} />
              </div>
              <div className='col-3'>
                <Card key={tvArray[1].id} tv={tvArray[1]} />
              </div>
              <div className='col-3'>
                <Card key={tvArray[2].id} tv={tvArray[2]} />
              </div>
              <div className='col-3'>
                <Card key={tvArray[3].id} tv={tvArray[3]} />
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className='row justify-content-between'>
              <div className='col-3'>
                <Card key={tvArray[0].id} tv={tvArray[0]} />
              </div>
              <div className='col-3'>
                <Card key={tvArray[1].id} tv={tvArray[1]} />
              </div>
              <div className='col-3'>
                <Card key={tvArray[2].id} tv={tvArray[2]} />
              </div>
              <div className='col-3'>
                <Card key={tvArray[3].id} tv={tvArray[3]} />
              </div>
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
