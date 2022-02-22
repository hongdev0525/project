/* action type */
const IN_LOADING = "loading/IN_LOADING";
const END_LOADING = "loading/END_LOADING";

export const inLoading = () => {
  return { type: IN_LOADING };
};

export const endLoading = () => {
  return { type: END_LOADING };
};

let initialState = {
  loadingState: false,
};

const LoadingSpinner = (state = initialState, action) => {
  switch (action.type) {
    case IN_LOADING:
      return { ...state, loadingState: true };
    case END_LOADING:
      return { ...state, loadingState: false };
    default:
      return state;
  }
};

export default LoadingSpinner;
