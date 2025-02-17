import { useSelector } from "react-redux";
import InfoIcon from "@mui/icons-material/Info";
import style from "./trending.module.css";

const IMAGE_URL = "https://image.tmdb.org/t/p/original";

const TrendingCarousel = () => {
  const trending = useSelector((state) => state.trending);

  const slugTitle = (title) =>
    title
      .toLowerCase()
      .replace(/[\s]+/g, "-")
      .replace(/[^a-z0-9áéíóúüñ-]+/gi, "");

  return (
    <div>
      <div
        id='carouselExampleCaptions'
        className='carousel slide carousel-fade'
        data-bs-ride='carousel'
      >
        <div className='carousel-indicators'>
          {trending.map((_, index) => (
            <button
              key={index}
              type='button'
              data-bs-target='#carouselExampleCaptions'
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        <div className='carousel-inner'>
          {trending.map((tre, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div className={style.carouselItemInfo}>
                <h3>{tre.title}</h3>
                <p style={{ maxHeight: "50%", overflow: "hidden" }}>
                  {tre.overview}
                </p>
                <a
                  href={`/${
                    tre.media_type === "movie" ? "pelicula" : "serie"
                  }/${slugTitle(tre.title)}-${tre.date.split("-")[0]}`}
                  style={{
                    backgroundColor: "rgba(122, 122, 122, 0.8)",
                    textDecoration: "none",
                    border: "none",
                    borderRadius: 5,
                    color: "white",
                    padding: 5,
                    display: "inline-flex",
                  }}
                >
                  <InfoIcon />
                  <span className={style.moreInfo}>Mas información</span>
                </a>
              </div>
              <img
                src={IMAGE_URL + tre.image}
                className='w-100'
                style={{ height: "75vh" }}
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingCarousel;
