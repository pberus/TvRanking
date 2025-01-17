import { useEffect } from "react";
import { TabsLists } from "../../components";
import { useDispatch } from "react-redux";
import { getAllLists } from "../../redux/actions";

const Lists = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLists());
  }, [dispatch]);

  return (
    <div>
      <TabsLists />
    </div>
  );
};

export default Lists;
