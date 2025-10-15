import { useEffect, useState } from "react";

export default function Home() {
  const [pi, setPi] = useState(null);
  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState(81.40);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Load Pi SDK dynamically
    const script = document.createElement("script");
    script.src = "https://sdk.minepi.com/pi-sdk.js";
    script.async = true;
    script.onload = () => {
      if (window.Pi) {
        window.Pi.init({ version: "2.0" });
        setPi(window.Pi);
        console.log("✅ Pi SDK loaded successfully");
      } else {
        console.error("❌ Pi SDK not found");
      }
    };
    document.body.appendChild(script);
  }, []);

  // Connect to Pi Wallet
  const handleConnect = async () => {
    if (!window.Pi) return alert("Please open this app inside Pi Browser.");

    try {
      const scopes = ["username", "payments"];
      const auth = await window.Pi.authenticate(scopes, (user) => console.log(user));
      setUsername(auth.user.username);
      setConnected(true);
      alert(`Wallet connected: ${auth.user.username}`);
    } catch (err) {
      console.error("Auth error:", err);
      alert("❌ Wallet connection failed. Please try again.");
    }
  };

  // Make a payment (0.01 Pi fee per transaction)
  const handlePayment = async () => {
    if (!window.Pi) return alert("Please open this app inside Pi Browser.");

    try {
      const paymentData = {
        amount: 0.01, // transaction fee per payment
        memo: "Test transaction from Click Pop Shop Pi",
        metadata: { orderId: "CPSP001" },
        to_address: "GCEUZO7JZ43VQJWF4YKPUBLHDVQVFNI7TSVG7KML3VTPOZ3VKD7LJDOM",
      };

      const callbacks = {
        onReadyForServerApproval: (paymentId) =>
          console.log("Ready for server approval:", paymentId),
        onReadyForServerCompletion: (paymentId, txid) => {
          console.log("Payment complete:", paymentId, txid);
          alert("✅ Payment completed successfully!");
        },
        onCancel: (paymentId) => console.log("❌ Payment cancelled:", paymentId),
        onError: (err) => {
          console.error("Payment error:", err);
          alert("⚠️ Payment failed. Please try again.");
        },
      };

      await window.Pi.createPayment(paymentData, callbacks);
    } catch (err) {
      console.error("Payment failed:", err);
    }
  };

  return (
    <div style={{
      textAlign: "center",
      padding: "50px",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1>💎 Click Pop Shop Pi</h1>
      <p>Experience real Pi payments inside Pi Browser<br />#RuamJaiRakPiNetworkThailand 💜</p>

      {!connected ? (
        <button
          style={{
            backgroundColor: "#703D92",
            color: "#fff",
            border: "none",
            padding: "12px 24px",
            borderRadius: "10px",
            fontSize: "18px",
            cursor: "pointer"
          }}
          onClick={handleConnect}
        >
          🔗 Connect Pi Wallet
        </button>
      ) : (
        <>
          <h2>💰 Wallet Connected</h2>
          <p><strong>Username:</strong> {username}</p>
          <p><strong>Balance:</strong> {balance} Pi</p>
          <button
            style={{
              backgroundColor: "#9C27B0",
              color: "#fff",
              border: "none",
              padding: "12px 24px",
              borderRadius: "10px",
              fontSize: "18px",
              cursor: "pointer"
            }}
            onClick={handlePayment}
          >
            ⚡ Pay with Pi
          </button>
          <p style={{ marginTop: "15px", color: "gray", fontSize: "14px" }}>
            Transaction fee: 0.01 Pi per payment
          </p>
        </>
      )}
    </div>
  );
}
