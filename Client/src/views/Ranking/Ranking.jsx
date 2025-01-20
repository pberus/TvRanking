import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLists } from "../../redux/actions";

const Ranking = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  useEffect(() => {
    isAuthenticated && dispatch(getAllLists());
  }, [dispatch, isAuthenticated]);

  return (
    <div>
      <h3 className='p-3'>No disponible todavia...</h3>
    </div>
  );
};

export default Ranking;
