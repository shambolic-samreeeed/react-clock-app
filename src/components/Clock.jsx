import React, { useEffect, useState } from "react";
import "./Clock.css";

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [paused, setPause] = useState(false)



  useEffect(()=>{
    const saved = localStorage.getItem('saved-time');
    if(saved){
        setTime(new Date(saved));
        setPause(true);
    }
  })

  useEffect(() => {

    if (paused) return;
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const saveTime = () =>{
    localStorage.setItem("saved-time", time.toISOString());
  }

  const clearStorage = () =>{
    localStorage.removeItem("saved-time");
    setTime(new Date())
  }

  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  const hourDegree = (hour % 12) * 30 + minute * 0.5;
  const minuteDegree = minute * 6 + second * 0.1;
  const secondDegree = second * 6;

  return (
    <>
      <div className="clock">
        <div className="inner-pin"></div>
        <div className="hour twelve">12</div>
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

        <div
          className="hour-hand"
          style={{
            transform: `rotate(${hourDegree}deg)`,
          }}
        ></div>

        <div
          className="minute-hand"
          style={{
            transform: `rotate(${minuteDegree}deg)`,
          }}
        ></div>

        <div
          className="second-hand"
          style={{
            transform: `rotate(${secondDegree}deg)`,
          }}
        ></div>
      </div>

      <button type="button" className="btn btn-success" onClick={()=> saveTime()}>Save Time</button>
      <button type="button" className="btn btn-danger" onClick={()=> clearStorage()}>Clear Time</button>
    </>
  );
};

export default Clock;
