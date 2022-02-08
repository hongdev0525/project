const SET_SECONDS = "timer/SET_SECONDS";
const SET_MINUTES = "timer/SET_MINUTES";
const GET_SECONDS = "timer/GET_SECONDS";
const GET_MINUTES = "timer/GET_MINUTES";
const SET_INITIAL_STATE = "timer/SET_INITIAL";

export const setInitialState = (mm, ss) => {
  return {
    type: SET_INITIAL_STATE,
    payload: {
      seconds: ss,
      minutes: mm
    }
  };
};
export const setSeconds = seconds => {
  return {
    type: SET_SECONDS,
    payload: {
      seconds: seconds
    }
  };
};
export const setMinutes = minutes => {
  return {
    type: SET_MINUTES,
    payload: {
      minutes: minutes
    }
  };
};
export const getSeconds = () => {
  return {
    type: GET_SECONDS
  };
};
export const getMinutes = () => {
  return {
    type: GET_MINUTES
  };
};

const initialState = {
  seconds: 0,
  minutes: 0
};

const Timer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIAL_STATE:
      return {
        ...state,
        seconds: action.payload.seconds,
        minutes: action.payload.minutes
      };
    case SET_SECONDS:
      return { ...state, seconds: action.payload.seconds };
    case SET_MINUTES:
      return { ...state, minutes: action.payload.minutes };
    case GET_SECONDS:
      return state.seconds;
    case GET_MINUTES:
      return state.minutes;
    default:
      return state;
  }
};

export default Timer;
