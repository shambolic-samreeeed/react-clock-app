import React, { useEffect } from "react";
import { useState } from "react";
import "./Clock.css";

const Clock = () => {
  //useState hook to store the time
  const [time, setTime] = useState(new Date());
  //useState hook to keep track if time is fetched from the local storage or not
  const [isPaused, setIsPaused] = useState(false);

  //constants to store the time and their corresponding degrees.
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  const hourDegree = (hour % 12) * 30 + minute * 0.5;
  const minuteDegree = minute * 6 + second * 0.1;
  const secondDegree = second * 6;

  useEffect(()=>{
    const localStorageTime = localStorage.getItem('saved-time');
    if(localStorageTime){
      setTime(new Date(localStorageTime));
      setIsPaused(true)
    }
  },[])

  //useEffect to run the code on mount and setInterval to run it once every second.
  useEffect(() => {
    if (isPaused) return;

    const oneSecondInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(oneSecondInterval); //preventing memory leakage and clearing the interval when not needed
  }, [isPaused]);

  const saveToLocalStorage = () => {
    localStorage.setItem("saved-time", new Date().toISOString());
    setIsPaused(true);
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("saved-time");
    setIsPaused(false)
  };
  return (
    <>
      <div className="clock-face">
        <div className="clock-pin"></div>
        <div className="hour one">1</div>
        <div className="hour two">2</div>
        <div className="hour three">3</div>
        <div className="hour four">4</div>
        <div className="hour five">5</div>
        <div className="hour six">6</div>
        <div className="hour seven">7</div>
        <div className="hour eight">8</div>
        <div className="hour nine">9</div>
        <div className="hour ten">10</div>
        <div className="hour eleven">11</div>
        <div className="hour twelve">12</div>
        <div
          className="hour-hand"
          style={{ transform: `rotate(${hourDegree - 90}deg)` }}
        ></div>

        <div
          className="minute-hand"
          style={{ transform: `rotate(${minuteDegree - 90}deg)` }}
        ></div>

        <div
          className="second-hand"
          style={{ transform: `rotate(${secondDegree - 90}deg)` }}
        ></div>
      </div>

      {isPaused ? (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => clearLocalStorage()}
        >
          Clear Clock
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-success"
          onClick={() => saveToLocalStorage()}
        >
          Save Time
        </button>
      )}
    </>
  );
};

export default Clock;
