import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { generateRandomString } from "../../services/utils";

const Setting = () => {
  const [cliendId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const getLoggedInUser = async () => {
    try {
      let res = await api.get(`/auth`);
      return res?.data?.user;
    } catch (error) {
      console.log("Error", error);
    }
  };
  const getClientCred = async () => {
    setLoading(true);
    let response = await getLoggedInUser();
    if (!response?.cliendId && !response?.clientSecret) {
      let cliendId = await generateRandomString(50);
      let clientSecret = await generateRandomString(50);
      setClientId(cliendId);
      setClientSecret(clientSecret);
      setLoading(false);
    } else {
      setClientId(response?.clientId);
      setClientSecret(response?.clientSecret);
      setLoading(false);
    }
  };
  useEffect(() => {
    getClientCred();
  }, []);

  if (loading) return <div>Loading</div>;
  return (
    <div>
      <p>
        <strong>Client Id: </strong>
        {cliendId}
      </p>
      <p>
        <strong>Client Secret: </strong>
        {clientSecret}
      </p>
    </div>
  );
};

export default Setting;
