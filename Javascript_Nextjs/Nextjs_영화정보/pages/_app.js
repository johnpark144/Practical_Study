import "../styles/globals.css"; // _app.js에서만 글로벌 CSS사용가능
import Layout from './../components/Layout';

function _app({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />   {/* pageProps은 서버사이드에서 보내준 props */}
    </Layout>
  );
}

export default _app;
