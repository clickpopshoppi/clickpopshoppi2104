import { useEffect } from "react";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // ✅ โหลด Pi SDK จาก CDN แทน npm
    const script = document.createElement("script");
    script.src = "https://sdk.minepi.com/pi-sdk.js";
    script.async = true;
    script.onload = () => {
      console.log("✅ Pi SDK loaded from CDN successfully");
      if (window.Pi) {
        window.Pi.init({ version: "2.0", sandbox: true });
      }
    };
    script.onerror = () => console.error("❌ Failed to load Pi SDK from CDN");
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, []);

  return (
    <>
      <Head>
        <title>Click Pop Shop Pi</title>
        <meta name="description" content="Click Pop Shop Pi | Powered by Pi Network" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
