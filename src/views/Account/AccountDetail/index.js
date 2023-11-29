import React, { useEffect, useState, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Spin } from "antd";
import { api } from "../../../services/api";
import { ArrowLeftOutlined, CopyOutlined } from "@ant-design/icons";
import { Row, Col, Input, message } from "antd";
import "./index.css";

const { TextArea } = Input;
const AccountDetail = () => {
  const [account, setAccount] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    const fetchAccount = async (accountId) => {
      setLoading(true);
      try {
        let response = await api.get(`/account/${accountId}`);
        setAccount(response?.data?.account);
      } catch (error) {
        console.log("Error: ", error.message);
      } finally {
        setLoading(false);
      }
    };
    if (params?.id) fetchAccount(params.id);
  }, [params]);

  const handleBack = () => navigate(-1);

  return (
    <Spin spinning={loading}>
      <div>
        <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
          Back
        </Button>
        <Row gutter={[16, 16]}>
          <Col lg={12} xs={24}>
            <h3>Account Name</h3>
            <p>{account?.name}</p>
          </Col>
          <Col lg={12} xs={24}>
            <h3>Software Type</h3>
            <p>{account?.softwareType}</p>
          </Col>
          <Col lg={12} xs={24}>
            <h3>License Status</h3>
            <p>{account?.licenceStatus}</p>
          </Col>
          <Col lg={12} xs={24}>
            <h3>Company</h3>
            <p>{account?.company}</p>
          </Col>
          <Col lg={12} xs={24}>
            <h3>Country</h3>
            <p>{account?.country}</p>
          </Col>
          <Col lg={12} xs={24}>
            <h3>Contact Name</h3>
            <p>{account?.contactName}</p>
          </Col>
          <Col lg={12} xs={24}>
            <h3>Usage Counter</h3>
            <p>{account?.usageCounter}</p>
          </Col>
          <Col lg={12} xs={24}>
            <h3>Max Users</h3>
            <p>{account?.maxUsers}</p>
          </Col>
          <Col lg={12} xs={24}>
            <h3>Account Status</h3>
            <p>{account?.status}</p>
          </Col>
        </Row>
      </div>
    </Spin>
  );
};

export default AccountDetail;
