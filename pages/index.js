import { useEffect, useState } from "react";
import { Pi } from "@pi-network/pi-sdk";

export default function Home() {
  const [message, setMessage] = useState("");

  // Initialize Pi SDK once
  useEffect(() => {
    Pi.init({
      version: "2.0",
      sandbox: true, // MUST be true for Step 6/10
      appName: "Click Pop Shop Pi",
      channelName: "clickpopshoppi2104",
      scopes: ["payments"],
    });
  }, []);

  const handlePayment = async () => {
    try {
      const payment = await Pi.createPayment({
        amount: 0.01,
        memo: "Test payment from Click Pop Shop Pi",
        metadata: { type: "test" },
        callbacks: {
          onReadyForServerApproval: async (paymentId) => {
            await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE}/api/pi/approve?paymentId=${paymentId}`,
              { method: "POST" }
            );
          },
          onReadyForServerCompletion: async (paymentId, txid) => {
            await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE}/api/pi/complete?paymentId=${paymentId}&txid=${txid}`,
              { method: "POST" }
            );
          },
          onCancel: (paymentId) => {
            console.warn("Payment canceled:", paymentId);
          },
          onError: (error, paymentId) => {
            console.error("Payment error:", error, paymentId);
          },
        },
      });

      setMessage("Payment created successfully.");
      console.log("Payment object:", payment);
    } catch (error) {
      console.error(error);
      setMessage("Payment failed: " + (error?.message || "Unknown error"));
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        backgroundColor: "#f7f0ff",
        fontFamily: "sans-serif",
        padding: 24,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.8 }}>
        ⚙️ Sandbox Mode Enabled (For verification)
      </div>
      <h1 style={{ margin: 0 }}>Click Pop Shop Pi</h1>
      <p style={{ marginTop: 0 }}>Test Pi Payment Integration</p>

      <button
        onClick={handlePayment}
        style={{
          backgroundColor: "#703D92",
          color: "#fff",
          padding: "12px 30px",
          borderRadius: 10,
          border: "none",
          cursor: "pointer",
          fontSize: 16,
        }}
      >
        Test Pi Payment
      </button>

      <p style={{ marginTop: 20, color: "#333" }}>{message}</p>
    </div>
  );
}
