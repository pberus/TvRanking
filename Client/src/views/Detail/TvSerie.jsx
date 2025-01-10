import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail, removeDetail } from "../../redux/actions";

const TvSerieDetail = () => {
  const { slug } = useParams();

  const dispatch = useDispatch();

  const detail = useSelector((state) => state.detail);
  console.log("detail:", detail);

  useEffect(() => {
    dispatch(getDetail(slug, "tv"));
    return () => {
      dispatch(removeDetail());
    };
  }, [dispatch, slug]);

  return (
    <div>
      <h2>Detalle de la Serie: {slug}</h2>
    </div>
  );
};

export default TvSerieDetail;
