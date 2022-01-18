import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { countAdd, countSubstract } from "/modules/example/Counter";

const CounterContainer = () => {
  const state = useSelector(state => {
    return state.Counter.count;
  });
  const dispatch = useDispatch();
  useEffect(
    () => {
      console.log(state);
    },
    [state]
  );
  const handleAdd = () => {
    dispatch(countAdd());
  };
  const handleSubstract = () => {
    dispatch(countSubstract());
  };
  return (
    <div>
      <h1>
        {state}
      </h1>
      <button onClick={() => handleAdd()}>+</button>
      <button onClick={() => handleSubstract()}>-</button>
    </div>
  );
};

export default CounterContainer;
