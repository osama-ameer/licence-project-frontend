import { Button, Result, message } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../services/api";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const updateAccount = async (accountId, values) => {
    try {
      let response = await api.put(`/account/${accountId}`, values);
      if (response?.status === 200) {
        message.success("Account updated!");
      }
    } catch (error) {
      console.log("Error: ", error.message);
    } finally {
    }
  };

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
  const getSubscription = async (subscriptionId) => {
    let token = await getAccessToken();
    try {
      let response = await axios.get(
        `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${subscriptionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            Prefer: "return=representation",
          },
        }
      );

      let values = {
        expiryDate: response?.data?.billing_info?.next_billing_time,
      };
      updateAccount(response?.data?.custom_id, values);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    // Accessing individual query parameters
    const subscriptionId = searchParams.get("subscription_id");

    if (subscriptionId) getSubscription(subscriptionId);
  }, [location.search]);
  return (
    <div>
      <Result
        status="success"
        title="Payment Successfull!"
        extra={[
          <Button type="primary" key="console" onClick={() => navigate(`/`)}>
            Back to Home
          </Button>,
        ]}
      />
    </div>
  );
};

export default PaymentSuccess;
