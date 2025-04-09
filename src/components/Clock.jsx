import React, { useEffect } from "react";
import { useState } from "react";
import "./Clock.css";
import Button from "./Button";

const Clock = () => {
  //useState hook to store the time
  const [time, setTime] = useState(new Date());
  //useState hook to keep track if time is fetched from the local storage or not
  const [isPaused, setIsPaused] = useState(false);

  //using useEffect hook to mimic the time interval of one second only runs if the isPaused value is false
  useEffect(() => {
    if (isPaused) return;

    const oneSecondInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(oneSecondInterval);
  }, [isPaused]);

  //runs once on load, to check if local storage has the time saved. so that when reloading the page, the clock shows the paused time
  useEffect(() => {
    const localStorageTime = localStorage.getItem("saved-time");
    if (localStorageTime) {
      setTime(new Date(localStorageTime));
      setIsPaused(true);
    }
  }, []);
  
  //constants to store the time
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();
  //constants to store the degree of the hands according to the time
  const hourDegree = (hour % 12) * 30 + minute * 0.5;
  const minuteDegree = minute * 6 + second * 0.1;
  const secondDegree = second * 6;


  //functions to store the time to the local storage and clear from the local storage
  const saveToLocalStorage = () => {
    console.log('item saved to local storage')
    localStorage.setItem("saved-time", new Date().toISOString());
    setIsPaused(true);
  };

  const clearLocalStorage = () => {
    console.log('local storage cleared')
    localStorage.removeItem("saved-time");
    setIsPaused(false);
  };

  return (
    <>
    <center>
      
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
      
    {/* Using ternary operator to show/hide buttons based on isPaused value. */}
      {isPaused ? (
        <Button onClick={clearLocalStorage} buttonType={"btn btn-danger"} buttonText={"Clear Time"}></Button> 
      ) : (
        <Button onClick={saveToLocalStorage} buttonType={"btn btn-success"} buttonText={"Save Time"}></Button>
        
      )}
    </center>
    </>
  );
};

export default Clock;
