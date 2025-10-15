import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);

  const connectPiWallet = async () => {
    try {
      const scopes = ["username", "payments"];
      const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
      setUsername(authResult.user.username || "User");
      setWalletConnected(true);
      console.log("Wallet connected:", authResult);
    } catch (err) {
      alert("Wallet connection failed: " + err.message);
      console.error(err);
    }
  };

  const onIncompletePaymentFound = (payment) => {
    console.log("Incomplete payment found:", payment);
  };

  const handlePayment = async () => {
    const baseAmount = 1.0; // Example amount
    const fee = 0.01;
    const totalAmount = baseAmount + fee;
    const destination = "GCEUZO7JZ43VQJWF4YKPUBLHDVQVFNI7TSVG7KML3VTPOZ3VKD7LJDOM";

    try {
      const payment = await window.Pi.createPayment(
        {
          amount: totalAmount,
          memo: "Click Pop Shop Pi Purchase",
          metadata: { orderId: Date.now().toString() },
          to_address: destination,
        },
        {
          onReadyForServerApproval: (paymentId) =>
            console.log("Ready for approval:", paymentId),
          onReadyForServerCompletion: (paymentId, txid) =>
            alert(`✅ Payment complete!\nTransaction ID: ${txid}`),
          onCancel: () => alert("❌ Payment canceled."),
          onError: (error) => alert("⚠️ Payment error: " + error.message),
        }
      );
      console.log("Payment:", payment);
    } catch (error) {
      alert("Unexpected error: " + error.message);
      console.error(error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h1>💎 Click Pop Shop Pi</h1>
      <p>
        Welcome to the Pi-powered shopping experience!
        <br />#RuamJaiRakPiNetworkThailand 💜
      </p>

      {!walletConnected ? (
        <button
          onClick={connectPiWallet}
          style={{
            backgroundColor: "#7B3FE4",
            color: "#fff",
            border: "none",
            padding: "12px 32px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "18px",
            marginTop: "20px",
          }}
        >
          🔗 Connect Pi Wallet
        </button>
      ) : (
        <>
          <h3>💰 Wallet Connected</h3>
          <p>
            Username: <strong>{username}</strong>
          </p>
          <p>
            Balance: <strong>{balance ? `${balance} Pi` : "81.40 Pi"}</strong>
          </p>
          <button
            onClick={handlePayment}
            style={{
              backgroundColor: "#9C4DF4",
              color: "white",
              padding: "12px 30px",
              border: "none",
              borderRadius: "8px",
              fontSize: "18px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Pay with Pi ⚡
          </button>
          <p style={{ fontSize: "14px", color: "#555", marginTop: "10px" }}>
            ⚠️ Transaction fee: 0.01 Pi per payment (paid by sender).
            <br />
            🏦 Receiver wallet:{" "}
            <strong>
              GCEUZO7JZ43VQJWF4YKPUBLHDVQVFNI7TSVG7KML3VTPOZ3VKD7LJDOM
            </strong>
          </p>
        </>
      )}
    </div>
  );
}
