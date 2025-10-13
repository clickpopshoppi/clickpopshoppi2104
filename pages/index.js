import { useEffect } from "react";
import Script from "next/script";

export default function Home() {
  useEffect(() => {
    const initPi = () => {
      if (!window.Pi) return;
      try {
        window.Pi.init({
          version: "2.0",
          sandbox: true, // testnet
          appId: "clickpopshoppi1719", // your Pi App ID
          scopes: ["payments"],
        });
        console.log("✅ Pi SDK initialized");
      } catch (e) {
        console.error("❌ Pi init error:", e);
      }
    };

    if (typeof window !== "undefined") {
      if (window.Pi) initPi();
      else window.addEventListener("pi-sdk-ready", initPi);
      return () => window.removeEventListener("pi-sdk-ready", initPi);
    }
  }, []);

  const handleTestPayment = async () => {
    try {
      const payment = await window.Pi.createPayment({
        amount: 0.01,
        memo: "Test Pi Transaction",
        metadata: { type: "test" },
      });
      alert("✅ Payment initiated successfully!");
      console.log(payment);
    } catch (error) {
      alert("❌ Transaction Failed: " + error.message);
      console.error(error);
    }
  };

  return (
    <>
      <Script
        src="https://sdk.minepi.com/pi-sdk.js"
        strategy="beforeInteractive"
      />
      <div
        style={{
          textAlign: "center",
          marginTop: "100px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1 style={{ color: "#6C2BD9" }}>🚀 Click Pop Shop Pi</h1>
        <p>Start testing your Pi transaction securely below</p>
        <button
          onClick={handleTestPayment}
          style={{
            backgroundColor: "#6c2bd9",
            color: "white",
            padding: "12px 28px",
            borderRadius: "10px",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Test Pi Payment 💎
        </button>
      </div>
    </>
  );
}
