import React, { useEffect, useState } from "react";
import "./CountDown.css";
import alarm_alert from "./alarm_clock.mp3";

const CountDown = () => {
  console.log(alarm_alert);
  const [timerData, setTimerData] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [runTimer, setRunTimer] = useState(false);
  const [intervalId, setIntervalId] = useState(null); // To stop the interval on click of pause
  const [isPaused, setIsPaused] = useState(false);
  const alaramRing = new Audio(alarm_alert);

  useEffect(() => {
    // if (isPaused) {
    //   setIsPaused(false);
    // }
    if (runTimer) {
      const timerInterval = setInterval(() => {
        console.log("hi");
        setTimerData((prev) => {
          // If second is not 0, subtract it by 1
          if (prev?.seconds > 0) {
            // 0 - False
            return { ...prev, seconds: prev?.seconds - 1 };
          } else if (prev?.minutes > 0 && prev?.seconds === 0) {
            // 2 minutes
            // 0 seconds

            // minuts = 1
            // seconsd - 59
            // If second is 0 and minute is greater than 0, subtract it by 1
            return { ...prev, minutes: prev?.minutes - 1, seconds: 59 };
          } else if (prev?.hours > 0 && prev?.minutes === 0) {
            // 0 minutes
            // hours 3

            // hours 2
            // min - 59
            // if minute is 0 and current hour is greater than 0 subtract it by 1
            return {
              ...prev,
              hours: prev.hours - 1,
              minutes: 59,
              seconds: 59,
            };
          } else {
            alaramRing.play();
            setRunTimer(false);
            clearInterval(timerInterval);
            return { ...prev, seconds: 0 };
          }
        });
      }, 1000);
      setIntervalId(timerInterval);

      return () => clearInterval(timerInterval);
    }
  }, [runTimer, isPaused]);

  const handleChange = (e) => {
    console.log("Called");
    const { name, value } = e.target;
    // Ensure the input value is within valid ranges
    const numericValue = Math.max(
      0,
      Math.min(Number(value), name === "hours" ? 12 : 59)
    );
    setTimerData((prev) => ({ ...prev, [name]: numericValue }));
  };

  // It adds 0 before number if number is less than 10
  const formatTime = (time) => (time < 10 ? `0${time}` : `${time}`);

  const isButtonDisabled =
    timerData?.hours || timerData?.minutes || timerData?.seconds;

  return (
    <div style={{ marginTop: "2rem" }}>
      <div>
        <h3 style={{ textAlign: "center" }}>CountDown Timer</h3>
        <div className="counter_container">
          <input
            name="hours"
            onChange={handleChange}
            value={formatTime(timerData?.hours)}
            className="timer_input"
            // style={{borderRight:'1px solid'}}
          />
          <h1>:</h1>
          <input
            name="minutes"
            onChange={handleChange}
            value={formatTime(timerData?.minutes)}
            className="timer_input"
          />
          <h1>:</h1>
          <input
            name="seconds"
            onChange={handleChange}
            value={formatTime(timerData?.seconds)}
            className="timer_input"
          />
        </div>
        <div className="button_container_timer">
          {(timerData?.hours || timerData?.seconds || timerData?.minutes) &&
          !isPaused &&
          runTimer ? (
            <button
              className="button"
              disabled={!isButtonDisabled}
              onClick={() => {
                clearInterval(intervalId);
                setRunTimer(false);
                setIsPaused(true);
              }}
            >
              Pause
            </button>
          ) : (
            <button
              className={`button ${!isButtonDisabled && "button_disabled"}`}
              disabled={!isButtonDisabled}
              onClick={() => {
                setRunTimer(true);
                setIsPaused(false);
              }}
            >
              {isPaused ? "Resume" : "Start"}
            </button>
          )}
          <button
            className={`button ${!isButtonDisabled && "button_disabled"}`}
            onClick={() => {
              setTimerData({ hours: 0, minutes: 0, seconds: 0 });
              setIsPaused(false);
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountDown;
