import React, { useEffect, useState } from "react";
import PayPalBtn from "../../components/PayPalBtn";
import axios from "axios";
import "./index.css";
import { useLocation } from "react-router-dom";
import "./index.css";

function Payment() {
  const [planId, setPlanId] = useState();
  const [showBtn, setShowBtn] = useState(false);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  const location = useLocation();
  const accId = new URLSearchParams(location.search).get("accountId");

  useEffect(() => {
    initiatesPayment();
  }, []);

  const getAccessToken = async () => {
    let clientId =
      "AUOo_zzdoiEIQHkQbDAiRmxZtkQT5s6jBvLz-5A0nGYQIY6z2HJEM74_XvCiyDDzIsHLRaNjdAE88CYT";
    let clientSecret =
      "EJfNVF4MAK_2t1M3wujKlGzaJ1fn53YU2VidRiJ6M8cH_k49hOT6IOqnuQGO8_XwRyIKx_QDL_YoZ_XN";
    const authString = `${clientId}:${clientSecret}`;
    const base64Auth = btoa(authString);
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${base64Auth}`,
    };
    const data = "grant_type=client_credentials";

    try {
      let result = await axios.post(
        "https://api-m.sandbox.paypal.com/v1/oauth2/token",
        data,
        { headers }
      );
      return result?.data?.access_token;
    } catch (error) {
      console.log("Error", error);
      return null;
    }
  };

  const initiatesPayment = async () => {
    setLoading(true);
    let token = await getAccessToken();
    if (token) {
      setToken(token);
      await fetchPlans(token);
      setLoading(false);
    }
    setLoading(false);
  };

  const createSubscription = async (e, plan) => {
    setPlanId(plan?.id);
    let price = plan?.billing_cycles[0]?.pricing_scheme?.fixed_price;

    let body = {
      plan_id: plan?.id,
      start_time: "2023-12-07T16:24:00Z",
      custom_id: accId,
      subscriber: {
        name: { given_name: "John", surname: "Doe" },
        email_address: "customer@example.com",

        shipping_amount: {
          currency_code: price?.currency_code,
          value: price?.value,
        },
        shipping_address: {
          name: { full_name: "John Doe" },
          address: {
            address_line_1: "2211 N First Street",
            address_line_2: "Building 17",
            admin_area_2: "San Jose",
            admin_area_1: "CA",
            postal_code: "95131",
            country_code: "US",
          },
        },
      },
      application_context: {
        brand_name: "walmart",
        locale: "en-US",
        shipping_preference: "SET_PROVIDED_ADDRESS",
        user_action: "SUBSCRIBE_NOW",
        payment_method: {
          payer_selected: "PAYPAL",
          payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
        },
        return_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/payment",
      },
    };

    try {
      let response = await axios.post(
        "https://api-m.sandbox.paypal.com/v1/billing/subscriptions",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            "PayPal-Request-Id": "SUBSCRIPTION-21092019-001",
            Prefer: "return=representation",
          },
        }
      );
      let approveURL = response?.data?.links?.find(
        (item) => item.rel === "approve"
      );
      window.open(approveURL?.href, "_blank");
    } catch (error) {
      console.log("error", error);
    }
  };
  const fetchPlans = async (token) => {
    try {
      let result = await axios.get(
        "https://api-m.sandbox.paypal.com/v1/billing/plans?sort_by=create_time&sort_order=desc",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            Prefer: "return=representation",
          },
        }
      );
      setPlans(result?.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  // const paypalSubscribe = (data, actions) => {
  //   console.log("planId", planId);
  //   return actions.subscription.create({
  //     plan_id: planId,
  //   });
  // };

  // const paypalOnError = (err) => {
  //   console.log("Error", err);
  // };
  // const paypalOnApprove = (data, detail) => {
  //   // call the backend api to store transaction details
  //   console.log("Payapl approved");
  //   console.log("approved data", data);
  //   console.log("approved detail", detail);
  // };

  // const showPaypalBtn = (e, plan) => {
  //   setPlanId(plan?.id);
  //   setShowBtn(true);
  // };

  if (loading) return <div>Loading..</div>;
  return (
    <div className="plans-root">
      <div className="plans-container">
        {plans?.plans
          ?.filter((plan) => plan?.status !== "INACTIVE")
          ?.map((plan) => (
            <div
              className="plans-item"
              style={{
                border: `${
                  planId === plan?.id ? "5px solid green" : "3px solid black"
                }`,
              }}
              key={plan.id}
            >
              <ul class="price">
                <li class="header" style={{ backgroundColor: "#04AA6D" }}>
                  {plan?.name}
                </li>
                <li class="grey">$ 24.99 / year</li>
                <li>{plan?.description}</li>
                <li>25 Emails</li>
                <li>25 Domains</li>
                <li>2GB Bandwidth</li>
                <li class="grey">
                  <button
                    onClick={(e) => createSubscription(e, plan)}
                    className="subscribe-btn"
                  >
                    Subscribe
                  </button>
                </li>
              </ul>
            </div>
          ))}
      </div>

      {/* {showBtn && (
        <PayPalBtn
          createSubscription={paypalSubscribe}
          onApprove={paypalOnApprove}
          catchError={paypalOnError}
          onError={paypalOnError}
          onCancel={paypalOnError}
        />
      )} */}
      {/* <button onClick={createSubscription}>Subscribe</button> */}
      {/* <button onClick={(e) => getSubscription(e, "I-GW37UVXNP98F")}>
        Get Subscription
      </button> */}
    </div>
  );
}
export default Payment;
