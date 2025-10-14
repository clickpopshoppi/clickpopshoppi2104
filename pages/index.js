"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  // ✅ Initialize Pi SDK dynamically (ปลอดภัยสุดใน Vercel)
  useEffect(() => {
    async function initPi() {
      try {
        const { Pi } = await import("@pi-network/pi-sdk");
        Pi.init({
          version: "2.0",
          sandbox: true, // ✅ true สำหรับ Sandbox Test
          appName: "Click Pop Shop Pi",
          channelName: "clickpopshoppi2104",
          scopes: ["payments"],
        });
        console.log("✅ Pi SDK initialized successfully.");
      } catch (err) {
        console.error("❌ Pi SDK initialization failed:", err);
      }
    }

    initPi();
  }, []);

  // ✅ Payment function
  const handlePayment = async () => {
    try {
      const { Pi } = await import("@pi-network/pi-sdk");

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
            console.warn("⚠️ Payment canceled:", paymentId);
          },
          onError: (error, paymentId) => {
            console.error("❌ Payment error:", error, paymentId);
          },
        },
      });

      setMessage("✅ Payment created successfully.");
      console.log("Payment object:", payment);
    } catch (error) {
      console.error("❌ Payment failed:", error);
      setMessage("Payment failed: " + (error?.message || "Unknown error"));
    }
  };

  // ✅ UI Rendering
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        backgroundColor: "#F8F4FF",
        fontFamily: "Inter, sans-serif",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "#703D92", marginBottom: "8px" }}>
        Click Pop Shop Pi
      </h1>
      <p style={{ marginTop: "0", color: "#444" }}>
        Test Pi Payment Integration (Sandbox)
      </p>

      <button
        onClick={handlePayment}
        style={{
          backgroundColor: "#703D92",
          color: "#fff",
          padding: "12px 28px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "600",
        }}
      >
        Test Pi Payment
      </button>

      <p style={{ marginTop: "18px", color: "#333", fontSize: "14px" }}>
        {message}
      </p>
    </div>
  );
}
        
