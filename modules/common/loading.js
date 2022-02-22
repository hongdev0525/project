/* action type */
const SET_LOADING = "loading/SET_LOADING";

export const setLoading = (state) => {
  return { type: SET_LOADING, state: state };
};

let initialState = {
  loadingState: false,
};

const LoadingSpinner = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loadingState: action.state };
    default:
      return state;
  }
};

export default LoadingSpinner;
