import { useEffect, useState } from "react";

export default function Home() {
  const [pi, setPi] = useState(null);
  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState(81.40);
  const [connected, setConnected] = useState(false);

  // โหลด SDK ของ Pi
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.minepi.com/pi-sdk.js";
    script.async = true;
    script.onload = () => {
      if (window.Pi) {
        window.Pi.init({ version: "2.0" });
        setPi(window.Pi);
        console.log("✅ Pi SDK Loaded");
      }
    };
    document.body.appendChild(script);
  }, []);

  // เชื่อมต่อกระเป๋า
  const handleConnect = async () => {
    if (!pi) return alert("⚠️ กรุณาเปิดใน Pi Browser เท่านั้น!");
    try {
      const scopes = ["username", "payments"];
      const auth = await pi.authenticate(scopes, (payment) =>
        console.log("Authorized:", payment)
      );
      setUsername(auth.user.username);
      setConnected(true);
      alert(`✅ Wallet connected: ${auth.user.username}`);
    } catch (err) {
      console.error("❌ Auth error:", err);
      alert("เชื่อมต่อกระเป๋าไม่สำเร็จ กรุณารีเฟรชหน้าและลองใหม่อีกครั้ง");
    }
  };

  // ทำการชำระเงิน
  const handlePayment = async () => {
    if (!pi) return alert("⚠️ กรุณาเปิดใน Pi Browser เท่านั้น!");
    try {
      const paymentData = {
        amount: 0.01,
        memo: "Test payment from Click Pop Shop Pi (ค่าธรรมเนียม 0.01 Pi)",
        metadata: { orderId: "test001" },
        to_address: "GCEUZO7JZ43VQJWF4YKPUBLHDVQVFNI7TSVG7KML3VTPOZ3VKD7LJDOM",
      };

      const callbacks = {
        onReadyForServerApproval: (paymentId) =>
          console.log("Ready for approval:", paymentId),
        onReadyForServerCompletion: (paymentId, txid) =>
          console.log("Ready for completion:", paymentId, txid),
        onCancel: (paymentId) => console.log("Payment cancelled:", paymentId),
        onError: (err) => console.error("Payment error:", err),
      };

      const payment = await pi.createPayment(paymentData, callbacks);
      console.log("✅ Payment initiated:", payment);
    } catch (err) {
      console.error("❌ Payment failed:", err);
      alert("เกิดข้อผิดพลาดในการชำระ กรุณาลองใหม่อีกครั้ง");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
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
            padding: "12px 22px",
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
              padding: "12px 22px",
              borderRadius: "10px",
              fontSize: "18px",
            }}
            onClick={handlePayment}
          >
            ⚡ Pay with Pi (0.01 Fee)
          </button>
        </>
      )}
    </div>
  );
}
