import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllLists } from "../../redux/actions";

const Ranking = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLists());
  }, [dispatch]);

  return (
    <div>
      <h3 className='p-3'>No disponible todavia...</h3>
    </div>
  );
};

export default Ranking;
