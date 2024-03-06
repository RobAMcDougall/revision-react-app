import Notes from "../../components/Notes";
import VideoPlayer from "../../components/embedingvideo";
import "./section1.css";
import { useState } from "react";

function VideoS1() {
  const [currentTimestamp, setCurrentTimestamp] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");

  return (
    <>
      <div className="section1">
        <VideoPlayer currentTimestamp={currentTimestamp} setCurrentTimestamp={setCurrentTimestamp} videoUrl={videoUrl} setVideoUrl={setVideoUrl} />
        <Notes currentTimestamp={currentTimestamp} setCurrentTimestamp={setCurrentTimestamp} videoUrl={videoUrl} setVideoUrl={setVideoUrl} />
      </div>
    </>
  );
}

export default VideoS1;
