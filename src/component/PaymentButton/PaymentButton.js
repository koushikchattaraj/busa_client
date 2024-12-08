import React from "react";
import { rozarpay } from "../../services/services";

const PaymentButton = ({ handleCreate, isDisable }) => {
  const loadRazorpay = async () => {
    const res = await rozarpay();
    const { id, amount, currency } = res.data;
    const options = {
      key: "rzp_test_Qt1tsMrbRuF3EH", // Replace with your Razorpay Key ID
      amount: amount,
      currency: currency,
      name: "Your Company Name",
      description: "Test Transaction",
      order_id: id,
      handler: (response) => {
        alert(`Payment successful: ${response.razorpay_payment_id}`);
        handleCreate();
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button
      className="submit-button"
      onClick={loadRazorpay}
      disabled={isDisable}
    >
      Pay Now
    </button>
  );
};

export default PaymentButton;
