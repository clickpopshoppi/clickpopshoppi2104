import { useEffect } from "react";

export default function Home() {
  const connectWallet = async () => {
    try {
      const scopes = ["username", "payments"];
      const auth = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
      alert(`👋 Hi ${auth.user.username}, your wallet is connected!`);
    } catch (error) {
      console.error("Connection failed:", error);
      alert("❌ Failed to connect wallet");
    }
  };

  const onIncompletePaymentFound = (payment) => {
    console.log("Found incomplete payment:", payment);
  };

  return (
    <div style={{ textAlign: "center", paddingTop: "100px" }}>
      <h1>💎 Click Pop Shop Pi</h1>
      <button
        onClick={connectWallet}
        style={{
          backgroundColor: "#7B3FE4",
          color: "white",
          fontSize: "18px",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Connect Wallet
      </button>
    </div>
  );
}
