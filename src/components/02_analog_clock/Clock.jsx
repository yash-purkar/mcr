import React, { useEffect, useState } from "react";
import "./Clock.css";
import { useGetClockDegrees } from "./hooks/useGetClockDegrees";

const Clock = () => {
  const { secondsDegree, minuteDegree, hoursDegree } = useGetClockDegrees();

  return (
    <div className="clock_container">
      {/* <div className="clock_inner_container"> */}
      <div className="clock_inner_container">
        <p className="hr_line" style={{transform: `rotate(${hoursDegree}deg)`}}></p>
        <p
          className="min_line"
          style={{ transform: `rotate(${minuteDegree}deg)` }}
        ></p>
        <p
          style={{ transform: `rotate(${secondsDegree}deg)` }}
          className="sec_line"
        ></p>
        {/* <p  className="sec_line"></p> */}
      </div>
      {/* </div> */}
    </div>
  );
};

export default Clock;
