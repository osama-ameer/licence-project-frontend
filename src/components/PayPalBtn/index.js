import { PayPalButton } from "react-paypal-button-v2";
import React from "react";
export function PayPalBtn(props) {
  const {
    amount,
    currency,
    createSubscription,
    onApprove,
    catchError,
    onError,
    onCancel,
  } = props;

  const paypalKey =
    "AUOo_zzdoiEIQHkQbDAiRmxZtkQT5s6jBvLz-5A0nGYQIY6z2HJEM74_XvCiyDDzIsHLRaNjdAE88CYT";
  return (
    <PayPalButton
      amount="8.0"
      currency="MYR"
      createSubscription={(data, details) => createSubscription(data, details)}
      onApprove={(data, details) => onApprove(data, details)}
      onError={(err) => onError(err)}
      catchError={(err) => catchError(err)}
      onCancel={(err) => onCancel(err)}
      onSuccess={(details, data) => {
        console.log("Transaction completed by " + details);
        console.log("Transaction completed by " + data);

        // // OPTIONAL: Call your server to save the transaction
        // return fetch("/paypal-transaction-complete", {
        //   method: "post",
        //   body: JSON.stringify({
        //     orderID: data.orderID,
        //   }),
        // });
      }}
      options={{
        clientId: paypalKey,
        vault: true,
      }}
      style={{
        shape: "rect",
        color: "gold",
        layout: "horizontal",
        label: "subscribe",
      }}
    />
  );
}
export default PayPalBtn;
