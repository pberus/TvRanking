import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail, removeDetail } from "../../redux/actions";
import noImageAvailable from "../../assets/no_image_available.jpg";
import { DetailCastCarousel, DetailImagesCarousel } from "../../components";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const MovieDetail = () => {
  const { slug } = useParams();

  const dispatch = useDispatch();

  const detail = useSelector((state) => state.detail);
  console.log("detail:", detail);
  const { title, poster_path, original_title, images, cast, genres, overview } =
    detail;

  useEffect(() => {
    dispatch(getDetail(slug, "movie"));
    return () => {
      dispatch(removeDetail());
    };
  }, [dispatch, slug]);

  return (
    <div>
      <div className='d-flex'>
        <img
          src={
            poster_path === null ? noImageAvailable : IMAGE_URL + poster_path
          }
          alt={title}
        />
        <div className='ms-3'>
          <h2>{title}</h2>
          {original_title && original_title !== title && (
            <h4 className='text-secondary'>
              Titulo original: {original_title}
            </h4>
          )}
          {genres?.length > 0 && (
            <div className='d-flex mt-3'>
              {genres.map((genre) => (
                <span
                  key={genre.id}
                  className='badge rounded-pill text-body-emphasis bg-body-secondary fw-medium me-2'
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}
          <p className='text-secondary mt-3'>{overview}</p>
        </div>
      </div>
      {cast?.length > 0 && <DetailCastCarousel cast={cast} />}
      {images?.length > 0 && <DetailImagesCarousel images={images} />}
    </div>
  );
};

export default MovieDetail;
