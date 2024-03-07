import { useRef, useEffect } from "react";
import gsap from "gsap";
import "./moti.css";

function MotiLanding() {
  const pictureRef = useRef(null);

  useEffect(() => {
    const picture = pictureRef.current;

    const handleMouseMove = (event) => {
      const { clientWidth, clientHeight } = picture;
      const { clientX, clientY } = event;
      const rect = picture.getBoundingClientRect();
      const offsetX = clientX - rect.left;
      const offsetY = clientY - rect.top;

      const xPercent = (offsetX - clientWidth / 2) / clientWidth;
      const yPercent = (offsetY - clientHeight / 2) / clientHeight;

      gsap.to(picture, {
        x: xPercent * -30,
        y: yPercent * -30,
        rotation: xPercent * 10,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(picture, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    picture.addEventListener("mousemove", handleMouseMove);
    picture.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      picture.removeEventListener("mousemove", handleMouseMove);
      picture.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div className="wholeSection">
        <div>
          <img src="/Screenshot_4.png" ref={pictureRef} alt="Screenshot" />
        </div>
        <div className="text">
          <h2 className="title">Daily Motivation with Our App</h2>
          <p className="para">
            Our app recognizes the value of motivation in shaping a better day.
            By incorporating daily inspirational quotes, it fosters positivity
            and resilience. These quotes serve as catalysts for personal growth
            and productivity, ensuring each day begins with encouragement and
            purpose, enhancing overall well-being and success.
          </p>
        </div>
      </div>
    </>
  );
}

export default MotiLanding;
