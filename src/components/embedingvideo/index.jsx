import { useState, useRef } from "react";
import YouTube from "react-youtube";
import "./video.css";

const VideoPlayer = ({
  currentTimestamp,
  setCurrentTimestamp,
  videoUrl,
  setVideoUrl,
}) => {
  const [videoId, setVideoId] = useState(null);
  const playerRef = useRef(null);

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
      setCurrentTimestamp(0); // Reset timestamp when a new video is loaded
    } else {
      alert("Invalid YouTube URL");
    }
  };

  const handlePlay = (event) => {
    const { data } = event;
    if (data === YouTube.PlayerState.PAUSED) {
      const currentTimestamp = event.target.getCurrentTime(); // Use event.target
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
      <form onSubmit={handleSubmit} className="form">
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
            onStateChange={handlePlay}
            ref={(youtubePlayer) => (playerRef.current = youtubePlayer)}
          />
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
