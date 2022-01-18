import { Html, Head, Main, NextScript } from "next/document";

const Document = () =>
  <Html>
    <Head>
      <script src="https://developers.kakao.com/sdk/js/kakao.js" defer />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>;

export default Document;
