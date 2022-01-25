import { wrapper } from "../modules/store";
import Layout from "../component/common/Layout";
import "../styles/globals.css";

const App = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default wrapper.withRedux(App);
