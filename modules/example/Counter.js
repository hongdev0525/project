const COUNT_ADD = "counter/COUNT_ADD";
const COUNT_SUBSTRACT = "counter/COUNT_SUBSTRACT";

export const countAdd = () => {
  return { type: COUNT_ADD };
};
export const countSubstract = () => {
  return { type: COUNT_SUBSTRACT };
};

let initialState = {
  count: 0
};

const Counter = (state = initialState, action) => {
  switch (action.type) {
    case COUNT_ADD:
      return { count: state.count + 1 };
    case COUNT_SUBSTRACT:
      return { count: state.count - 1 };
    default:
      return state;
  }
};

export default Counter;
