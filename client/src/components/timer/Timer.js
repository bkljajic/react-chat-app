import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import "./Timer.css";

const Timer = ({ time, onComplete }) => {
  const renderTime = ({ remainingTime }) => {
    return (
      <div className="timer">
        <div className="value">{remainingTime}</div>
      </div>
    );
  };

  return (
    <div className="timer-wrapper">
      <CountdownCircleTimer
        isPlaying
        duration={time}
        size={80}
        colors="#A30000"
        onComplete={() => onComplete()}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
};

export default Timer;
