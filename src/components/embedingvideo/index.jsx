import { useState } from "react";
import YouTube from "react-youtube";

const VideoPlayer = () => {
  const [videoUrl, setVideoUrl] = useState("");
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
    } else {
      alert("Invalid YouTube URL");
    }
  };

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter YouTube URL:
          <input type="text" value={videoUrl} onChange={handleInputChange} />
        </label>
        <button type="submit">Play Video</button>
      </form>
      {videoId && <YouTube videoId={videoId} opts={opts} />}
    </div>
  );
};

export default VideoPlayer;
