import { useState } from "react";
import YouTube from "react-youtube";
import "./video.css";

const VideoPlayer = ({
  setCurrentTimestamp,
  videoUrl,
  setVideoUrl,
  playerRef,
}) => {
  const [videoId, setVideoId] = useState(null);

  const handleInputChange = (event) => {
    setVideoUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const videoIdMatch = videoUrl.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    );
    if (videoIdMatch && videoIdMatch.length > 1) {
      setVideoId(videoIdMatch[1]);
      setCurrentTimestamp(0);
    }
  };

  const handlePlay = (event) => {
    const { data } = event;
    if (data === YouTube.PlayerState.PAUSED) {
      const currentTimestamp = event.target.getCurrentTime();
      setCurrentTimestamp(currentTimestamp);
    }
  };

  const opts = {
    height: "405",
    width: "720",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="video">
      <form onSubmit={handleSubmit} className="video-form">
        <label className="search-area">
          <input
            role="textbox"
            className="search-bar"
            type="text"
            name="Youtube URL"
            value={videoUrl}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" className="button">
          Play Video
        </button>
      </form>
      {videoId && (
        <>
          <YouTube
            videoId={videoId}
            opts={opts}
            onReady={(event) => (playerRef.current = event.target)}
            onStateChange={handlePlay}
          />
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
