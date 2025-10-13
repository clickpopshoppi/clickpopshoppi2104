import React, { useEffect } from "react";
import Script from "next/script";

export default function Home() {
  useEffect(() => {
    // Initialize Pi SDK
    if (window.Pi) {
      window.Pi.init({
        version: "2.0",
        sandbox: true,
        // ✅ ต้องมี "payments" ใน scopes ด้วย
        scopes: ["payments", "username", "wallet_address"],
        onIncompletePaymentFound: (payment) => {
          console.log("Incomplete payment:", payment);
        },
      });
      console.log("✅ Pi SDK initialized successfully");
    } else {
      console.error("❌ Pi SDK not found");
    }
  }, []);

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
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <Script src="https://sdk.minepi.com/pi-sdk.js"></Script>
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
        Test Pi Transaction 💎
      </button>
    </div>
  );
}
