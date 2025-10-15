import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import QRCode from "qrcode.react";

export default function Home() {
  const [piUser, setPiUser] = useState(null);
  const [balance, setBalance] = useState(81.4);
  const [stakeAmount, setStakeAmount] = useState(10);
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [showQR, setShowQR] = useState(false);
  const [scanMode, setScanMode] = useState(false);
  const walletAddress = "GBMRV...BQZY7";

  const connectWallet = async () => {
    try {
      const user = await window.Pi.authenticate(["payments"], onIncompletePaymentFound);
      setPiUser(user);
      alert(`Wallet connected: ${user.username}`);
    } catch (err) {
      alert("Please open in Pi Browser and try again.");
    }
  };

  useEffect(() => {
    if (piUser) {
      setTransactions([
        { id: 1, type: "receive", amount: 0.25, date: "2025-09-10" },
        { id: 2, type: "send", amount: 1.0, date: "2025-09-11" },
        { id: 3, type: "stake", amount: 10.0, date: "2025-10-12" },
        { id: 4, type: "receive", amount: 2.5, date: "2025-10-14" },
      ]);
    }
  }, [piUser]);

  const handlePay = () => {
    const amount = 1.0;
    const fee = 0.01;
    if (balance < amount + fee) return alert("Insufficient balance");
    setBalance((p) => p - amount - fee);
    const newTx = { id: Date.now(), type: "send", amount, fee, date: new Date().toISOString().slice(0, 10) };
    setTransactions((p) => [newTx, ...p]);
    alert(`Paid ${amount} Pi (fee ${fee})`);
  };

  const handleStake = () => {
    const amount = 1.0;
    const fee = 0.01;
    if (balance < amount + fee) return alert("Insufficient balance");
    setBalance((p) => p - amount - fee);
    setStakeAmount((p) => p + amount);
    const newTx = { id: Date.now(), type: "stake", amount, fee, date: new Date().toISOString().slice(0, 10) };
    setTransactions((p) => [newTx, ...p]);
    alert(`Staked ${amount} Pi (fee ${fee})`);
  };

  const onIncompletePaymentFound = (p) => console.log("Incomplete:", p);

  const contacts = [
    { name: "Building Materials", address: "GA66J...FO3OA" },
    { name: "Fish Sauce", address: "GBMRV...BQZY7" },
    { name: "Coffee Shop", address: "GDRVC...NC7GI" },
  ];

  const filteredTx = activeTab === "all" ? transactions : transactions.filter((t) => t.type === activeTab);

  // Generate bar chart data (monthly summary)
  const monthlyData = [
    { month: "Aug", receive: 0.5, send: 0.2, stake: 5 },
    { month: "Sep", receive: 1.2, send: 0.5, stake: 7 },
    { month: "Oct", receive: 2.8, send: 1.0, stake: 10 },
  ];

  return (
    <main style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>💎 Click Pop Shop Pi Wallet</h1>
      <p>#RuamJaiRakPiNetworkThailand 💜</p>

      {!piUser ? (
        <button
          onClick={connectWallet}
          style={{
            backgroundColor: "#703D92",
            color: "#fff",
            padding: "12px 28px",
            borderRadius: "10px",
            border: "none",
            fontSize: "16px",
            marginTop: "20px",
          }}
        >
          🔗 Connect Pi Wallet
        </button>
      ) : (
        <>
          {/* Balance Overview */}
          <div style={{ background: "#f7f7f7", borderRadius: "12px", padding: "20px", marginTop: "20px" }}>
            <h2>Balance: {balance.toFixed(2)} Pi</h2>
            <p>Stake: {stakeAmount.toFixed(2)} Pi</p>
          </div>

          {/* Chart Section */}
          <div
            style={{
              marginTop: "30px",
              background: "#fff",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h3>📊 Monthly Transaction Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="receive" fill="#24A148" name="Receive" />
                <Bar dataKey="send" fill="#D92D20" name="Send" />
                <Bar dataKey="stake" fill="#703D92" name="Stake" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Actions */}
          <div style={{ marginTop: "25px" }}>
            <button
              onClick={handlePay}
              style={{
                backgroundColor: "#6E44FF",
                color: "#fff",
                padding: "12px 28px",
                borderRadius: "10px",
                border: "none",
                fontSize: "16px",
                margin: "8px",
              }}
            >
              ⚡ Pay
            </button>
            <button
              onClick={handleStake}
              style={{
                backgroundColor: "#24A148",
                color: "#fff",
                padding: "12px 28px",
                borderRadius: "10px",
                border: "none",
                fontSize: "16px",
                margin: "8px",
              }}
            >
              🔒 Stake
            </button>
          </div>

          {/* QR */}
          <div style={{ marginTop: "25px" }}>
            <button
              onClick={() => setShowQR(!showQR)}
              style={{
                backgroundColor: "#FFD700",
                color: "#000",
                padding: "10px 24px",
                borderRadius: "10px",
                border: "none",
                fontSize: "16px",
                marginRight: "8px",
              }}
            >
              📲 Show QR
            </button>
            <button
              onClick={() => setScanMode(!scanMode)}
              style={{
                backgroundColor: "#FF8C00",
                color: "#fff",
                padding: "10px 24px",
                borderRadius: "10px",
                border: "none",
                fontSize: "16px",
              }}
            >
              🔍 Scan QR
            </button>
          </div>

          {showQR && (
            <div
              style={{
                marginTop: "15px",
                background: "#fff",
                borderRadius: "10px",
                padding: "10px",
                display: "inline-block",
              }}
            >
              <QRCode value={walletAddress} size={150} />
              <p style={{ fontSize: "12px", marginTop: "5px" }}>{walletAddress}</p>
            </div>
          )}

          {/* Contacts */}
          <div
            style={{
              marginTop: "20px",
              background: "#fff5e6",
              borderRadius: "10px",
              padding: "20px",
              textAlign: "left",
            }}
          >
            <h3>👥 Contacts</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {contacts.map((c, i) => (
                <li
                  key={i}
                  style={{
                    borderBottom: "1px solid #eee",
                    padding: "8px 0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <strong>{c.name}</strong>
                    <br />
                    <small>{c.address}</small>
                  </div>
                  <div>
                    <button
                      style={{
                        background: "#6E44FF",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        padding: "4px 10px",
                        marginRight: "4px",
                      }}
                    >
                      ↗ Send
                    </button>
                    <button
                      style={{
                        background: "#24A148",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        padding: "4px 10px",
                      }}
                    >
                      ↙ Receive
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <footer
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "100%",
              background: "#703D92",
              display: "flex",
              justifyContent: "space-around",
              color: "#fff",
              padding: "10px 0",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            <span>🏠 Home</span>
            <span>💸 Pay/Request</span>
            <span>💰 Tokens</span>
            <span>👥 Contacts</span>
          </footer>
        </>
      )}
    </main>
  );
}
