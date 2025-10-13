import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (!window.Pi) return;
    try {
      window.Pi.init({
        version: "2.0",
        sandbox: true,
        appId: "clickpopshoppi1719", // ✅ แก้ให้ตรงกับ App ID ใน Dev Portal
        scopes: ["payments"],
      });
      console.log("✅ Pi SDK initialized successfully");
    } catch (error) {
      console.error("❌ Pi SDK initialization error:", error);
    }
  }, []);

  const handlePayment = async () => {
    try {
      const payment = await window.Pi.createPayment({
        amount: 0.01,
        memo: "Test payment for ClickPopShopPi",
        metadata: { type: "test" },
      });
      alert("✅ Payment successful!");
      console.log(payment);
    } catch (error) {
      alert("❌ Payment failed: " + error.message);
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Click Pop Shop Pi</title>
      </Head>

      <Script
        src="https://sdk.minepi.com/pi-sdk.js"
        strategy="beforeInteractive"
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#faf5ff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1 style={{ color: "#6C2BD9" }}>🚀 Click Pop Shop Pi</h1>
        <p style={{ color: "#333" }}>Connect and test Pi payment below</p>
        <button
          onClick={handlePayment}
          style={{
            backgroundColor: "#6C2BD9",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "12px 24px",
            fontSize: "18px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Test Pi Payment 💎
        </button>
      </div>
    </>
  );
}
