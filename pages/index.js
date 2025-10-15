import { useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState(""); // ช่องกรอกจำนวน Pi

  const handleConnect = async () => {
    if (!window.Pi) {
      alert("Please open this app inside the Pi Browser.");
      return;
    }

    try {
      const scopes = ["username", "payments"];
      const auth = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
      setUser(auth.user);
      alert(`✅ Welcome ${auth.user.username}! Wallet Connected`);
    } catch (error) {
      console.error("❌ Authentication failed:", error);
    }
  };

  const handlePayment = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid Pi amount first.");
      return;
    }

    const paymentData = {
      amount: parseFloat(amount),
      memo: `Payment from Click Pop Shop Pi`,
      metadata: { type: "purchase" },
    };

    const callbacks = {
      onReadyForServerApproval: (paymentId) => {
        console.log("Ready for approval:", paymentId);
      },
      onReadyForServerCompletion: (paymentId, txid) => {
        console.log("Completed:", paymentId, txid);
        alert(`✅ Payment successful! TXID: ${txid}`);
      },
      onCancel: (paymentId) => {
        console.log("Payment cancelled:", paymentId);
      },
      onError: (error, paymentId) => {
        console.error("Payment error:", error, paymentId);
      },
    };

    try {
      const payment = await window.Pi.createPayment(paymentData, callbacks);
      console.log("Payment created:", payment);
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  const onIncompletePaymentFound = (payment) => {
    console.log("Incomplete payment found:", payment);
  };

  return (
    <main style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>💜 Click Pop Shop Pi</h1>
      <p>Welcome to the Pi-powered shopping experience!<br />#RuamJaiRakPiNetworkThailand 💎</p>

      {!user && (
        <button
          onClick={handleConnect}
          style={{
            backgroundColor: "#703D92",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          🔗 Connect Pi Wallet
        </button>
      )}

      {user && (
        <>
          <div style={{ marginTop: "30px" }}>
            <label style={{ fontSize: "18px", color: "#333" }}>
              Enter Pi Amount:
            </label>
            <br />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 0.5 Pi"
              style={{
                marginTop: "10px",
                padding: "8px",
                width: "120px",
                textAlign: "center",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <button
            onClick={handlePayment}
            style={{
              backgroundColor: "#8B5CF6",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            💰 Pay {amount ? amount : "…"} Pi
          </button>
        </>
      )}
    </main>
  );
}
