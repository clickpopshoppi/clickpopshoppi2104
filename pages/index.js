import { useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);

  const handleConnect = async () => {
    if (!window.Pi) {
      alert("Pi SDK not loaded. Please open this app in Pi Browser.");
      return;
    }

    try {
      const scopes = ["username", "payments"];
      const auth = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
      setUser(auth.user);
      alert(`Welcome ${auth.user.username}! ✅ Wallet Connected`);
      console.log("User:", auth);
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  const onIncompletePaymentFound = (payment) => {
    console.log("Incomplete payment found:", payment);
  };

  return (
    <main style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>💜 Click Pop Shop Pi</h1>
      <p>Connect your Pi Wallet below to get started!</p>
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
        }}
      >
        🔗 Connect Pi Wallet
      </button>

      {user && (
        <p style={{ marginTop: "20px" }}>
          Connected as <strong>@{user.username}</strong>
        </p>
      )}
    </main>
  );
}
