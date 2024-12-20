import { useSelector } from "react-redux";
import { TabsLists } from "../../components";

const Lists = () => {
    const watchList = useSelector((state) => state.watchList)
    const seen = useSelector((state) => state.seen)
    const liked = useSelector((state) => state.liked)

  return (
    <div>
      <TabsLists watchList={watchList} seen={seen} liked={liked}/>
    </div>
  );
};

export default Lists;
