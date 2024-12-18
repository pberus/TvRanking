import PropTypes from "prop-types";
import style from "./streaming.module.css";

const IMAGE_URL = "https://image.tmdb.org/t/p/w92";

const Streaming = ({ streamingArray }) => {    
  return (
    <div>
      <div id='carouselExample' className='carousel slide'>
        <div className='carousel-inner'>
          <div className='carousel-item active'>
            <div className='row'>
              {streamingArray.slice(0, 19).map((stre) => (
                <button
                  key={stre.id}
                  className={`col ${style.streamingButtons}`}
                >
                  <img
                    src={IMAGE_URL + stre.img}
                    alt={stre.name}
                    title={stre.name}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className='carousel-item'>
            <div className='row'>
              {streamingArray.slice(19, 38).map((stre) => (
                <button
                  key={stre.id}
                  className={`col ${style.streamingButtons}`}
                >
                  <img
                    src={IMAGE_URL + stre.img}
                    alt={stre.name}
                    title={stre.name}
                  />
                </button>
              ))}
            </div>
          </div>
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

Streaming.propTypes = {
  streamingArray: PropTypes.array.isRequired,
};

export default Streaming;
