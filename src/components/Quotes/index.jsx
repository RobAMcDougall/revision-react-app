import { useState, useEffect } from "react";
import "./index.css";
export default function Quotes() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        setQuote(`${data.content} - ${data.author}`);
      })
      .catch((error) => console.error("Error fetching quote:", error));
  }, []);

  return (
    <div className="quotes-tile">
      <div className="quotes-tile-white">
        <h2>Motivational Quote</h2>

        <div className="motivational-quote">
          <h3 role="quote">{quote}</h3>
        </div>
      </div>
    </div>
  );
}
