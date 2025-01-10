import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail, removeDetail } from "../../redux/actions";
import noImageAvailable from "../../assets/no_image_available.jpg";
import DetailCarousel from "../../components/Carousel/detail";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const MovieDetail = () => {
  const { slug } = useParams();

  const dispatch = useDispatch();

  const detail = useSelector((state) => state.detail);
  console.log("detail:", detail);
  const { title, poster_path, original_title, images } = detail;

  useEffect(() => {
    dispatch(getDetail(slug, "movie"));
    return () => {
      dispatch(removeDetail());
    };
  }, [dispatch, slug]);

  return (
    <div>
      {images?.length > 0 && <DetailCarousel images={images} />}
      <h2>Detalle de la Pelicula: {slug}</h2>
      {original_title && original_title !== title && (
        <p>Titulo original: {original_title}</p>
      )}
      <img
        src={poster_path === null ? noImageAvailable : IMAGE_URL + poster_path}
        alt={title}
      />
    </div>
  );
};

export default MovieDetail;
