import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSeconds, setMinutes, setInitialState } from "/modules/common/timer";
const Timer = ({ mm, ss }) => {
  const dispatch = useDispatch();
  const timetObj = useSelector(state => {
    return state.Timer;
  });
  console.log(timetObj);
  //   const [minutes, setMinutes] = useState(parseInt(mm));
  //   const [seconds, setSeconds] = useState(parseInt(ss));

  useEffect(() => {
    dispatch(setInitialState(mm, ss));
  }, []);

  useEffect(
    () => {
      const countdown = setInterval(() => {
        if (parseInt(timetObj.seconds) > 0) {
          dispatch(setSeconds(parseInt(timetObj.seconds) - 1));
        }
        if (parseInt(timetObj.seconds) === 0) {
          if (parseInt(timetObj.minutes) === 0) {
            clearInterval(countdown);
          } else {
            dispatch(setMinutes(parseInt(timetObj.minutes) - 1));
            dispatch(setSeconds(59));
          }
        }
      }, 1000);
      return () => clearInterval(countdown);
    },
    [timetObj.seconds, timetObj.minutes]
  );
  return (
    <div className="timer-container">
      <span>
        {timetObj.minutes}:{timetObj.seconds < 10
          ? `0${timetObj.seconds}`
          : timetObj.seconds}
      </span>
    </div>
  );
};

export default Timer;
