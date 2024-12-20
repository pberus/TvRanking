import { useSelector } from "react-redux";
import { TabsLists } from "../../components";

const Lists = () => {
    const watchlist = useSelector((state) => state.watchlist)
    const seen = useSelector((state) => state.seen)
    const liked = useSelector((state) => state.liked)

  return (
    <div>
      <TabsLists watchlist={watchlist} seen={seen} liked={liked}/>
    </div>
  );
};

export default Lists;
