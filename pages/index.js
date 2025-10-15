import { useState, useEffect } from 'react';

export default function Home() {
  const [piUser, setPiUser] = useState(null);
  const [balance, setBalance] = useState(null);

  // Step 1: Connect to Pi Wallet
  const connectWallet = async () => {
    try {
      const user = await window.Pi.authenticate(['payments'], onIncompletePaymentFound);
      setPiUser(user);
      alert(`Wallet connected: ${user.username}`);
    } catch (err) {
      console.error('Wallet connection failed', err);
      alert('Failed to connect wallet. Please open in Pi Browser.');
    }
  };

  // Step 2: Show balance (mock until Pi SDK full API enabled)
  useEffect(() => {
    if (piUser) {
      // Placeholder: This will fetch real balance later via Pi SDK
      setBalance('81.40 Pi');
    }
  }, [piUser]);

  // Step 3: Handle any incomplete transactions
  const onIncompletePaymentFound = (payment) => {
    console.log('Found incomplete payment:', payment);
  };

  return (
    <main style={{ textAlign: 'center', padding: '60px 20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>💎 Click Pop Shop Pi</h1>
      <p>Welcome to the Pi-powered shopping experience!<br />#RuamJaiRakPiNetworkThailand 💜</p>

      {!piUser ? (
        <button
          onClick={connectWallet}
          style={{
            backgroundColor: '#703D92',
            color: 'white',
            padding: '12px 28px',
            borderRadius: '10px',
            border: 'none',
            fontSize: '16px',
            marginTop: '20px',
          }}
        >
          🔗 Connect Pi Wallet
        </button>
      ) : (
        <>
          <h2 style={{ marginTop: '40px' }}>👛 Wallet Connected</h2>
          <p>Username: <strong>{piUser.username}</strong></p>
          <p>Balance: <strong>{balance}</strong></p>
          <button
            style={{
              backgroundColor: '#6E44FF',
              color: 'white',
              padding: '12px 28px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '16px',
              marginTop: '20px',
            }}
          >
            Pay with Pi ⚡
          </button>
        </>
      )}
    </main>
  );
}      
