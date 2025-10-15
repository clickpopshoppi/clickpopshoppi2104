// pages/index.js
import { useState } from "react";

export default function Home() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ดึงกุญแจจาก Environment (ที่เราใส่ใน Vercel)
  const API_KEY = process.env.PI_API_KEY;

  const handlePayment = async () => {
    try {
      if (!amount) {
        setMessage("Please enter amount first.");
        return;
      }
      setLoading(true);
      setMessage("Connecting to Pi Wallet...");

      // เรียก Pi SDK จาก window (ทำงานใน Pi Browser)
      const payment = await window.Pi.createPayment(
        {
          amount: parseFloat(amount),
          memo: "Click Pop Shop Pi Purchase",
          metadata: { orderId: Date.now().toString() },
          to_address: "GCEUZO7JZ43VQJWF4YKPUBLHDVQVFNI7TSVG7KML3VTPOZ3VKD7LJDOM",
        },
        {
          headers: { Authorization: `Key ${API_KEY}` },
          onReadyForServerCompletion: (paymentId, txid) => {
            setMessage(`✅ Transaction complete! TXID: ${txid}`);
          },
        }
      );
    } catch (err) {
      console.error(err);
      setMessage("❌ Payment failed or cancelled.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        fontFamily: "system-ui, sans-serif",
        padding: "40px",
        maxWidth: "480px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h1>💜 Click Pop Shop Pi</h1>
      <p>Pay easily with your Pi Wallet.</p>
      <p>Transaction fee: <b>0.01 Pi per payment</b></p>

      <input
        type="number"
        step="0.01"
        min="0"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{
          padding: "10px",
          marginTop: "20px",
          width: "100%",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={handlePayment}
        disabled={loading}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          background: "#703D92",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        {loading ? "Processing..." : "Pay with Pi"}
      </button>

      <p style={{ marginTop: "20px", fontSize: "14px", color: "#555" }}>
        Receiving wallet: <br />
        <b>GCEUZO7JZ43VQJWF4YKPUBLHDVQVFNI7TSVG7KML3VTPOZ3VKD7LJDOM</b>
      </p>

      <p style={{ marginTop: "20px", color: "green" }}>{message}</p>
    </main>
  );
} 
