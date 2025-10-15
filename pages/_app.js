import { useEffect } from "react";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // โหลด Pi SDK จาก CDN ของ Pi Network
    const script = document.createElement("script");
    script.src = "https://sdk.minepi.com/pi-sdk.js";
    script.async = true;
    script.onload = () => {
      if (window.Pi) {
        window.Pi.init({ version: "2.0" });
        console.log("✅ Pi SDK Loaded Successfully!");
      } else {
        console.error("❌ Pi SDK not found");
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <Head>
        <title>Click Pop Shop Pi</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
