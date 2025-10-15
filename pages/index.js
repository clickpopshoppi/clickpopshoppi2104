import { useEffect, useState } from "react";

export default function Home() {
  const [pi, setPi] = useState(null);
  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState(81.40);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.minepi.com/pi-sdk.js";
    script.async = true;
    script.onload = () => {
      if (window.Pi) {
        window.Pi.init({ version: "2.0" });
        setPi(window.Pi);
        console.log("✅ Pi SDK loaded");
      }
    };
    document.body.appendChild(script);
  }, []);

  const handleConnect = async () => {
    if (!pi) return alert("Pi SDK not ready. Open inside Pi Browser.");
    try {
      const scopes = ["username", "payments"];
      const auth = await pi.authenticate(scopes, (p) => console.log(p));
      setUsername(auth.user.username);
      setConnected(true);
      alert(`Wallet connected: ${auth.user.username}`);
    } catch (err) {
      console.error("Auth error:", err);
    }
  };

  const handlePayment = async () => {
    if (!pi) return alert("Pi SDK not ready.");
    try {
      const paymentData = {
        amount: 0.01, // test transaction
        memo: "Test payment from Click Pop Shop Pi",
        metadata: { orderId: "test001" },
        to_address: "GCEUZO7JZ43VQJWF4YKPUBLHDVQVFNI7TSVG7KML3VTPOZ3VKD7LJDOM",
      };

      const callbacks = {
        onReadyForServerApproval: (paymentId) =>
          console.log("Approve:", paymentId),
        onReadyForServerCompletion: (paymentId, txid) =>
          console.log("Complete:", paymentId, txid),
        onCancel: (paymentId) => console.log("Cancelled:", paymentId),
        onError: (err) => console.error("Payment error:", err),
      };

      await pi.createPayment(paymentData, callbacks);
    } catch (err) {
      console.error("Payment failed:", err);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>💎 Click Pop Shop Pi</h1>
      <p>
        Welcome to the Pi-powered shopping experience!<br />
        #RuamJaiRakPiNetworkThailand 💜
      </p>

      {!connected ? (
        <button
          style={{
            backgroundColor: "#703D92",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "10px",
            fontSize: "18px",
          }}
          onClick={handleConnect}
        >
          🔗 Connect Pi Wallet
        </button>
      ) : (
        <>
          <h2>💰 Wallet Connected</h2>
          <p>Username: {username}</p>
          <p>Balance: {balance} Pi</p>
          <button
            style={{
              backgroundColor: "#9C27B0",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "10px",
              fontSize: "18px",
            }}
            onClick={handlePayment}
          >
            ⚡ Pay with Pi
          </button>
        </>
      )}
    </div>
  );
}
 
