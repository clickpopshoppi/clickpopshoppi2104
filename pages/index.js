import { Pi } from "@pi-network/pi-sdk";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  // ✅ เริ่มต้น Pi SDK
  Pi.init({
    version: "2.0",
    sandbox: false,
    appName: "Click Pop Shop Pi",
    scopes: ["payments"],
  });

  // ✅ ฟังก์ชันทดสอบการชำระเงิน
  const handlePayment = async () => {
    try {
      const payment = await Pi.createPayment({
        amount: 0.01,
        memo: "Test payment from Click Pop Shop Pi 💎",
        metadata: { type: "test" },
      });
      setMessage("✅ Payment created successfully!");
      console.log(payment);
    } catch (error) {
      console.error(error);
      setMessage("❌ Payment failed: " + error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f7f0ff",
        fontFamily: "sans-serif",
      }}
    >
      <h1>Click Pop Shop Pi 💜</h1>
      <p>Test Pi Payment Integration</p>
      <button
        onClick={handlePayment}
        style={{
          backgroundColor: "#703D92",
          color: "white",
          padding: "12px 30px",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Test Pi Payment 💎
      </button>
      <p style={{ marginTop: "20px", color: "#333" }}>{message}</p>
    </div>
  );
}
