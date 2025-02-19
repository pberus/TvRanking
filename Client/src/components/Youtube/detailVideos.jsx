import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";

const YoutubeDetailVideos = ({ videos }) => {
  const [width, setWidth] = useState(window.innerWidth > 600 ? 550 : 300);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth > 600 ? 550 : 300);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const opts = {
    width: width,
    height: (width * 9) / 16,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return (
    <div className='d-flex flex-wrap justify-content-around mt-2'>
      {videos.map((vid) => (
        <div key={vid.id}>
          <h5>
            <u>{vid.type}</u>
          </h5>
          <YouTube
            videoId={vid.key}
            opts={opts}
            title={vid.name}
            loading={"lazy"}
          />
        </div>
      ))}
    </div>
  );
};

YoutubeDetailVideos.propTypes = {
  videos: PropTypes.array.isRequired,
};

export default YoutubeDetailVideos;
