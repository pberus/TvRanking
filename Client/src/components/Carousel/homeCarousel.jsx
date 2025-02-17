import PropTypes from "prop-types";
import Card from "../Card/Card";
import style from "./homeCarousel.module.css";
import { useEffect, useState } from "react";

const HomeCarousel = ({ tvArray, position }) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [tvChunks, setTvChunks] = useState([]);

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

  useEffect(() => {
    // Dividir tvArray en partes de visibleCount elementos
    const chunks = [];
    for (let i = 0; i < tvArray.length; i += visibleCount) {
      chunks.push(tvArray.slice(i, i + visibleCount));
    }
    setTvChunks(chunks);
  }, [tvArray, visibleCount]);
  console.log(tvChunks);

  return (
    <div className={style.color}>
      <div
        id={`carouselExampleIndicators${position}`}
        className='carousel slide'
      >
        <div className='carousel-inner'>
          {tvChunks.map((chunk, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div className='d-flex justify-content-center gap-1'>
                {chunk.map((tv) => (
                  <div key={tv.id}>
                    <Card tv={tv} />
                  </div>
                ))}
              </div>
            </div>
          ))}
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
