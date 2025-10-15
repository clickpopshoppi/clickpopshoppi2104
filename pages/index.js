import { useEffect, useState } from "react";

export default function Home() {
  const [pi, setPi] = useState(null);
  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState(81.40); // demo balance
  const [connected, setConnected] = useState(false);

  // ✅ โหลด Pi SDK อัตโนมัติ
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.minepi.com/pi-sdk.js";
    script.async = true;
    script.onload = () => {
      if (window.Pi) {
        window.Pi.init({ version: "2.0" });
        setPi(window.Pi);
        console.log("✅ Pi SDK loaded");
      } else {
        console.log("⚠️ Pi SDK not found");
      }
    };
    document.body.appendChild(script);
  }, []);

  // ✅ เชื่อมต่อกระเป๋า
  const handleConnect = async () => {
    if (!pi) {
      alert("Pi SDK not ready yet. Please refresh inside Pi Browser.");
      return;
    }
    try {
      const scopes = ["username", "payments"];
      const authResult = await pi.authenticate(scopes, onIncompletePaymentFound);
      console.log("✅ Auth Result:", authResult);
      setUsername(authResult.user.username);
      setConnected(true);
      alert(`Wallet connected: ${authResult.user.username}`);
    } catch (e) {
      console.error(e);
    }
  };

  // ✅ ฟังก์ชันชำระเงิน
  const handlePayment = async () => {
    if (!pi) {
      alert("Pi SDK not loaded yet.");
      return;
    }
    try {
      const payment = await pi.createPayment({
        amount: 1, // 💡 เปลี่ยนจำนวน Pi ที่ต้องการทดสอบ
        memo: "Test payment from Click Pop Shop Pi",
        metadata: { orderId: "1234" },
        to_address: "GCEUZO7JZ43VQJWF4YKPUBLHDVQVFNI7TSVG7KML3VTPOZ3VKD7LJDOM",
      },
      {
        onReadyForServerApproval: (paymentId) => {
          console.log("Ready for server approval:", paymentId);
        },
        onReadyForServerCompletion: (paymentId, txid) => {
          console.log("Ready for completion:", paymentId, txid);
        },
        onCancel: (paymentId) => {
          console.log("Payment cancelled:", paymentId);
        },
        onError: (error, paymentId) => {
          console.error("Payment error:", error, paymentId);
        }
      });
      console.log("✅ Payment initiated:", payment);
    } catch (err) {
      console.error("❌ Payment failed:", err);
    }
  };

  const onIncompletePaymentFound = (payment) => {
    console.log("Found incomplete payment:", payment);
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>💎 Click Pop Shop Pi</h1>
      <p>Welcome to the Pi-powered shopping experience!<br/>#RuamJaiRakPiNetworkThailand 💜</p>

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
