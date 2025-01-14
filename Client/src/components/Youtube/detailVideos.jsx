import PropTypes from "prop-types";
import YouTube from "react-youtube";

const YoutubeDetailVideos = ({ videos }) => {
  const opts = {
    height: "350",
    width: "550",
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
