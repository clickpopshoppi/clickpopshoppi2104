// pages/_app.js
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script
          src="https://sdk.minepi.com/pi-sdk.js"
          async
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener("DOMContentLoaded", function() {
                if (window.Pi) {
                  window.Pi.init({ version: "2.0" });
                }
              });
            `,
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
   
