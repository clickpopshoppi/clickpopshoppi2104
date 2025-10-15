// pages/_app.js
import { useEffect } from "react";
import Head from "next/head";
import "../styles/globals.css"; // ถ้ามีไฟล์ styles (ไม่มีก็ข้ามได้)

// ✅ Import Pi SDK
import { Pi } from "@pi-network/pi-sdk";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Initialize Pi SDK
    const initPi = async () => {
      try {
        await Pi.init({
          version: "2.0",
          sandbox: false, // true = ทดสอบใน sandbox, false = production
        });
        console.log("✅ Pi SDK initialized successfully");
      } catch (err) {
        console.error("❌ Pi SDK initialization failed:", err);
      }
    };

    initPi();
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
