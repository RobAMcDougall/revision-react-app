import Notes from "../../components/Notes";
import VideoPlayer from "../../components/embedingvideo";
import "./section1.css";
import { useState, useRef } from "react";

function VideoS1() {
  const [currentTimestamp, setCurrentTimestamp] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");
  const playerRef = useRef(null);

  return (
    <>
      <div className="section1">
        <Notes
          currentTimestamp={currentTimestamp}
          setCurrentTimestamp={setCurrentTimestamp}
          videoUrl={videoUrl}
          setVideoUrl={setVideoUrl}
          playerRef={playerRef}
        />
        <VideoPlayer
          currentTimestamp={currentTimestamp}
          setCurrentTimestamp={setCurrentTimestamp}
          videoUrl={videoUrl}
          setVideoUrl={setVideoUrl}
          playerRef={playerRef}
        />
      </div>
    </>
  );
}

export default VideoS1;
