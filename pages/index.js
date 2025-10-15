import { useState, useEffect } from "react";

export default function ClickPopShopPi() {
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [network, setNetwork] = useState("Test-Pi");

  useEffect(() => {
    if (!window.Pi) return;
    console.log("✅ Pi SDK is ready");
  }, []);

  const connectWallet = async () => {
    if (!window.Pi) return alert("⚠️ Please open this app inside the Pi Browser.");
    try {
      const scopes = ["username", "payments"];
      const auth = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
      setUser(auth.user);
      setBalance(network === "Pi" ? 81.4 : 106.82);
    } catch (err) {
      console.error(err);
      alert("Connection failed.");
    }
  };

  const handlePayment = async () => {
    if (!amount || Number(amount) <= 0) return alert("⚠️ Please enter a valid amount.");
    try {
      const data = {
        amount: parseFloat(amount),
        memo: `Click Pop Shop Pi (${network})`,
        metadata: { type: "payment" },
      };
      const cb = {
        onReadyForServerApproval: (id) => console.log("Ready for approval:", id),
        onReadyForServerCompletion: (id, txid) =>
          alert(`✅ Transaction completed! TXID: ${txid}`),
        onCancel: () => alert("❌ Payment cancelled."),
        onError: (e) => alert("⚠️ Payment error."),
      };
      await window.Pi.createPayment(data, cb);
    } catch (err) {
      console.error(err);
    }
  };

  const onIncompletePaymentFound = (p) => console.log("Incomplete payment found:", p);

  return (
    <main style={{ textAlign: "center", padding: "25px" }}>
      <h1>💜 Click Pop Shop Pi</h1>
      <p>#RuamJaiRakPiNetworkThailand</p>

      {!user ? (
        <button
          onClick={connectWallet}
          style={{
            background: "#703D92",
            color: "#fff",
            padding: "10px 22px",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "25px",
          }}
        >
          🔗 Connect Pi Wallet
        </button>
      ) : (
        <>
          <div
            style={{
              background: "#F5F3FF",
              borderRadius: "12px",
              padding: "18px",
              margin: "20px auto",
              display: "inline-block",
              width: "300px",
              textAlign: "left",
            }}
          >
            <p>🪪 <b>{user.username}</b></p>
            <p>
              🌐 Network:{" "}
              <select
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                style={{
                  borderRadius: "6px",
                  padding: "4px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="Pi">Pi Mainnet</option>
                <option value="Test-Pi">Test-Pi</option>
              </select>
            </p>
            <h2 style={{ color: "#4ADE80" }}>
              💰 {balance} {network}
            </h2>
          </div>

          <div style={{ marginTop: "20px" }}>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              style={{
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                width: "120px",
                textAlign: "center",
                marginRight: "8px",
              }}
            />
            <button
              onClick={handlePayment}
              style={{
                background: "#8B5CF6",
                color: "#fff",
                padding: "9px 20px",
                borderRadius: "8px",
                border: "none",
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              💰 Pay {amount || "…"} {network}
            </button>
          </div>

          <div
            style={{
              background: "#FAFAFA",
              borderRadius: "10px",
              padding: "15px",
              marginTop: "25px",
              textAlign: "left",
              width: "300px",
              display: "inline-block",
            }}
          >
            <h3>📜 Recent Transactions</h3>
            <p style={{ color: "#16A34A" }}>+100 {network}</p>
            <p style={{ color: "#DC2626" }}>-1 {network}</p>
            <p style={{ color: "#DC2626" }}>-10 {network}</p>
          </div>
        </>
      )}
    </main>
  );
}
