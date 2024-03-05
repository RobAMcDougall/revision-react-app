import React from "react";
import Calendar from "react-calendar";
import "../../App.css";
import { useState } from "react";

export default function FullCalendar() {
  const [calDate, setCalDate] = useState(new Date());

  // function onChange(calDate) {
  //   // change results based on calendar date click
  //   setCalDate(calDate)

  //   const filteredResults = userResults.filter(result => {
  //       const newResultFormat = new Date(result.created_at).toLocaleString().split(",")[0]
  //       const newCalDateFormat = calDate.toLocaleString().split(",")[0]
  //       return newResultFormat === newCalDateFormat
  //   })  }

  return (
    <div className="calendar-tile">
      <div className="calendar-tile-white">
        <Calendar/>
      </div>
    </div>
  );
}
