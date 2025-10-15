import Head from "next/head";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (window.Pi) {
      console.log("✅ Pi SDK loaded successfully!");
      window.Pi.init({ version: "2.0" });
    } else {
      console.warn("⚠️ Please open this app inside the Pi Browser.");
    }
  }, []);

  const handlePayment = () => {
    if (!window.Pi) {
      alert("⚠️ Please open this app inside the Pi Browser.");
      return;
    }

    const paymentData = {
      amount: 1,
      memo: "Test payment from Click Pop Shop Pi",
      metadata: { type: "test" },
    };

    const callbacks = {
      onReadyForServerApproval: (paymentId) => {
        console.log("Ready for approval:", paymentId);
      },
      onReadyForServerCompletion: (paymentId, txid) => {
        console.log("Completed:", paymentId, txid);
      },
      onCancel: (paymentId) => {
        console.log("Payment cancelled:", paymentId);
      },
      onError: (error, paymentId) => {
        console.error("Error:", error, paymentId);
      },
    };

    window.Pi.createPayment(paymentData, callbacks);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>🎉 Click Pop Shop Pi</h1>
      <p>
        Welcome to the Pi-powered shopping experience!
        <br />
        #RuamJaiRakPiNetworkThailand 💜
      </p>
      <button
        onClick={handlePayment}
        style={{
          padding: "10px 24px",
          fontSize: "18px",
          backgroundColor: "#7B2CBF",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Pay 1 Pi 💎
      </button>
    </div>
  );
}
