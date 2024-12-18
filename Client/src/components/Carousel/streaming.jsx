import PropTypes from "prop-types";
import style from "./streaming.module.css";
import { useEffect, useState } from "react";

const IMAGE_URL = "https://image.tmdb.org/t/p/w92";

const Streaming = ({ streamingArray, onStreamingChange, reset, setReset }) => {
  const [activeProviders, setActiveProviders] = useState([]);

  const handleChange = (provider) => {
    if (activeProviders.includes(provider)) {
      let filteredProviders = activeProviders.filter(
        (prov) => prov !== provider
      );
      setActiveProviders(filteredProviders);
      onStreamingChange("providers", filteredProviders);
    } else {
      setActiveProviders([...activeProviders, provider]);
      onStreamingChange("providers", [...activeProviders, provider]);
    }
  };

  useEffect(() => {
    if (reset) {
      setActiveProviders([]);
      onStreamingChange("providers", []);
      setReset(false);
    }
  }, [onStreamingChange, reset, setReset]);

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
                  onClick={() => handleChange(stre.id)}
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
  onStreamingChange: PropTypes.func.isRequired,
  reset: PropTypes.bool.isRequired,
  setReset: PropTypes.func.isRequired,
};

export default Streaming;
