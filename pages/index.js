import { Pi } from "@pi-network/pi-sdk";

Pi.init({
  version: "2.0",
  sandbox: true,
  scopes: ["payments"],
});

async function testTransaction() {
  try {
    const user = await Pi.authenticate(["payments"], onIncompletePaymentFound);
    const paymentData = {
      amount: 0.01,
      memo: "Click Pop Shop Pi test transaction 💎",
      metadata: { productId: "test_001" },
    };
    const payment = await Pi.createPayment(paymentData);
    await Pi.completePayment(payment.identifier);
    alert("✅ Test Pi Transaction Success!");
  } catch (error) {
    alert("❌ Transaction Failed: " + error.message);
  }
}

function onIncompletePaymentFound(payment) {
  return Pi.completePayment(payment.identifier);
}

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("testTransactionButton");
  if (button) {
    button.addEventListener("click", testTransaction);
  }
});
