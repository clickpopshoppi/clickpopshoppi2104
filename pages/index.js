import React, { useEffect } from "react";
import Script from "next/script";

export default function Home() {
  // เริ่มต้น SDK ของ Pi Network
  useEffect(() => {
    if (window.Pi) {
      window.Pi.init({ version: "2.0" });
      console.log("✅ Pi Network SDK initialized successfully!");
    } else {
      console.error("❌ Pi SDK not found. Please open in Pi Browser.");
      alert("⚠️ กรุณาเปิดแอปนี้ใน Pi Browser เท่านั้น");
    }
  }, []);

  // ฟังก์ชันทดสอบการชำระเงิน
  const handleTestTransaction = async () => {
    try {
      if (!window.Pi) {
        alert("⚠️ กรุณาเปิดใน Pi Browser เพื่อทดสอบธุรกรรม");
        return;
      }

      // เริ่มธุรกรรมทดลอง
      const payment = await window.Pi.createPayment({
        amount: 0.001,
        memo: "Test transaction from Click Pop Shop Pi",
        metadata: { purpose: "test" },
      });

      console.log("💰 Payment successful:", payment);
      alert("✅ Transaction Success!");
    } catch (error) {
      console.error("❌ Payment failed:", error);
      alert("❌ Transaction Failed: " + error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <Script src="https://sdk.minepi.com/pi-sdk.js" strategy="beforeInteractive" />
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
