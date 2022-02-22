import { wrapper } from "../modules/store";
import Layout from "../component/common/Layout";
import "../styles/globals.css";

const App = ({ Component, pageProps }) => {
  return (
    <Layout>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <Component {...pageProps} />
    </Layout>
  );
};

export default wrapper.withRedux(App);
