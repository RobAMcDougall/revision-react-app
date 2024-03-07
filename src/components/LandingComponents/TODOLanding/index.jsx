import { useRef, useEffect } from "react";
import gsap from "gsap";
import "./toDo.css";

function TODOLanding() {
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
        <div className="img-container">
          <img src="/Screenshot_2.png" ref={pictureRef} alt="Screenshot" />
        </div>
        <div className="text">
          <h2 className="title">The Power of To-Do Lists</h2>
          <p className="para">
            To-do lists are societal organizers, simplifying tasks for
            individuals. By breaking down goals into manageable steps, they
            enhance productivity and efficiency. Easy accessibility encourages
            widespread adoption, empowering people to prioritize effectively and
            achieve their objectives with clarity and focus.
          </p>
        </div>
      </div>
    </>
  );
}

export default TODOLanding;
