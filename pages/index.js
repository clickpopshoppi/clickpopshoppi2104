import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(81.40);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [stake, setStake] = useState(0);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.minepi.com/pi-sdk.js";
    script.async = true;
    script.onload = () => {
      window.Pi.init({ version: "2.0" });
      console.log("✅ Pi SDK Loaded");
    };
    document.body.appendChild(script);
  }, []);

  const connectWallet = async () => {
    try {
      const scopes = ["username", "payments"];
      const auth = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
      alert(`✅ Wallet connected: ${auth.user?.username}`);
      setUser(auth.user);
    } catch (err) {
      console.error("❌ Auth Error:", err);
      alert("⚠️ Failed to connect wallet.");
    }
  };

  const onIncompletePaymentFound = (payment) => {
    console.log("⚠️ Incomplete payment found:", payment);
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const amount = 0.01;
      const date = new Date().toLocaleString();

      const payment = await window.Pi.createPayment(
        {
          amount,
          memo: "Click Pop Shop Pi Payment",
          metadata: { orderId: Date.now().toString() },
        },
        {
          onReadyForServerApproval: (paymentId) => {
            console.log("🟢 Ready for approval:", paymentId);
          },
          onReadyForServerCompletion: (paymentId, txid) => {
            console.log("✅ Payment completed:", paymentId, txid);
            alert(`🎉 Payment Successful!\nPayment ID: ${paymentId}`);

            setBalance((prev) => (prev - amount - 0.01).toFixed(2));

            setHistory((prev) => [
              {
                type: "paid",
                amount,
                fee: 0.01,
                date,
                txid,
              },
              ...prev,
            ]);
          },
          onCancel: () => {
            alert("⚠️ Payment canceled.");
          },
          onError: (error) => {
            console.error("❌ Payment error:", error);
            alert("❌ Payment failed or canceled.");
          },
        }
      );

      console.log("✅ Payment Object:", payment);
    } catch (err) {
      console.error("❌ Payment Exception:", err);
      alert("⚠️ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleStake = () => {
    const date = new Date().toLocaleString();
    setStake((prev) => prev + 5);
    setHistory((prev) => [
      { type: "stake", amount: 5, fee: 0, date },
      ...prev,
    ]);
    alert("💎 Staked 5 Pi successfully!");
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        textAlign: "center",
        padding: "60px 20px",
      }}
    >
      <h1 style={{ fontSize: "32px", color: "#000" }}>💎 Click Pop Shop Pi</h1>
      <p style={{ fontSize: "16px", color: "#444" }}>
        Welcome to the Pi-powered shopping experience!
        <br />
        #RuamJaiRakPiNetworkThailand 💜
      </p>

      {!user ? (
        <button
          onClick={connectWallet}
          style={{
            backgroundColor: "#7c3aed",
            color: "#fff",
            padding: "14px 26px",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "30px",
          }}
        >
          🔗 Connect Pi Wallet
        </button>
      ) : (
        <>
          <div style={{ marginTop: "40px" }}>
            <h2>💰 Wallet Connected</h2>
            <p>
              Username: <b>{user.username}</b>
              <br />
              Balance: <b>{balance} Pi</b>
            </p>

            <button
              onClick={handlePayment}
              disabled={loading}
              style={{
                backgroundColor: loading ? "#aaa" : "#8b5cf6",
                color: "#fff",
                padding: "14px 30px",
                border: "none",
                borderRadius: "10px",
                fontSize: "18px",
                cursor: loading ? "not-allowed" : "pointer",
                marginTop: "20px",
              }}
            >
              ⚡ {loading ? "Processing..." : "Pay 0.01 Pi"}
            </button>

            <button
              onClick={handleStake}
              style={{
                backgroundColor: "#22c55e",
                color: "#fff",
                padding: "14px 30px",
                border: "none",
                borderRadius: "10px",
                fontSize: "18px",
                cursor: "pointer",
                marginTop: "20px",
                marginLeft: "10px",
              }}
            >
              💎 Stake 5 Pi
            </button>
          </div>

          <div style={{ marginTop: "50px" }}>
            <h3>📜 Transaction History</h3>
            {history.length === 0 ? (
              <p style={{ color: "#777" }}>No transactions yet.</p>
            ) : (
              <table
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  margin: "20px auto",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "2px solid #ccc" }}>
                    <th align="left">Date</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((tx, idx) => (
                    <tr
                      key={idx}
                      style={{
                        color:
                          tx.type === "paid"
                            ? "#ef4444"
                            : tx.type === "stake"
                            ? "#22c55e"
                            : "#16a34a",
                      }}
                    >
                      <td align="left">{tx.date}</td>
                      <td>{tx.type}</td>
                      <td>{tx.amount}</td>
                      <td>{tx.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}
