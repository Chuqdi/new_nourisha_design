import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <Script src="https://js.stripe.com/v3/" strategy="lazyOnload" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
