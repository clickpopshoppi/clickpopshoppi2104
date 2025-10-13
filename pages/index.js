import React from "react";
import Script from "next/script";

export default function Home() {
  const handleTestTransaction = async () => {
    try {
      const payment = await window.Pi.createPayment({
        amount: 0.001,
        memo: "Test transaction from Click Pop Shop Pi",
        metadata: { purpose: "test" },
      });
      console.log("Payment successful:", payment);
      alert("✅ Transaction Success!");
    } catch (error) {
      console.error("Payment failed:", error);
      alert("❌ Transaction Failed: " + error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Script
        src="https://sdk.minepi.com/pi-sdk.js"
        strategy="beforeInteractive"
      />
      <h1>🚀 Click Pop Shop Pi</h1>
      <p>Test your Pi transaction below</p>
      <button
        onClick={handleTestTransaction}
        style={{
          background: "#703D92",
          color: "white",
          padding: "12px 24px",
          borderRadius: "10px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Test Pi Transaction 💰
      </button>
    </div>
  );
}
