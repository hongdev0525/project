import { wrapper } from "../modules/store";
import "../styles/globals.css";

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default wrapper.withRedux(App);
