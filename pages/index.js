"use client";

import { useEffect, useState } from "react";
import * as Pi from "@pi-network/pi-sdk";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      Pi.init({
        version: "2.0",
        sandbox: true, // set to false when moving to production
        appName: "Click Pop Shop Pi",
        channelName: "clickpopshoppi2104",
        scopes: ["payments"],
      });
      console.log("✅ Pi SDK initialized successfully");
    } catch (error) {
      console.error("❌ Pi SDK initialization failed:", error);
    }
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

      setMessage("✅ Sandbox payment created successfully.");
      console.log("Payment object:", payment);
    } catch (error) {
      console.error("❌ Payment failed:", error);
      setMessage("❌ Payment failed: " + (error?.message || "Unknown error"));
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f7f0ff",
        fontFamily: "Inter, Arial, sans-serif",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "0.8rem", opacity: 0.75, marginBottom: "0.5rem" }}>
        ⚙️ Sandbox Mode Enabled (Verification)
      </div>

      <h1 style={{ margin: 0, color: "#703D92", fontSize: "2rem" }}>
        Click Pop Shop Pi
      </h1>

      <p style={{ marginTop: "0.5rem", color: "#333" }}>
        Test Pi Payment Integration
      </p>

      <button
        onClick={handlePayment}
        style={{
          backgroundColor: "#703D92",
          color: "#ffffff",
          padding: "12px 32px",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          fontSize: "1rem",
          marginTop: "1.5rem",
          transition: "opacity 0.25s ease-in-out",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.85)}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
      >
        Test Pi Payment 💎
      </button>

      <p style={{ marginTop: "1.5rem", color: "#111", fontSize: "0.95rem" }}>
        {message}
      </p>
    </main>
  );
}
