import React, { useEffect, useState, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Spin } from "antd";
import { api } from "../../../services/api";
import { ArrowLeftOutlined, CopyOutlined } from "@ant-design/icons";
import { Row, Col, Input, message } from "antd";
import "./index.css";

const { TextArea } = Input;
const AccountDetail = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    const fetchUser = async (userId) => {
      setLoading(true);
      try {
        let response = await api.get(`/users/${userId}`);
        setUser(response?.data?.user);
      } catch (error) {
        console.log("Error: ", error.message);
      } finally {
        setLoading(false);
      }
    };
    if (params?.id) fetchUser(params.id);
  }, [params]);

  const handleBack = () => navigate(-1);

  return (
    <Spin spinning={loading}>
      <div>
        <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
          Back
        </Button>
        <Row gutter={[16, 16]}>
          <Col md={12} xs={24}>
            <h3>User Name</h3>
            <p>{user?.name}</p>
          </Col>
          <Col md={12} xs={24}>
            <h3>User Email</h3>
            <p>{user?.email}</p>
          </Col>
          <Col md={12} xs={24}>
            <h3>Client Id</h3>
            <p>{user?.clientId}</p>
          </Col>
          <Col md={12} xs={24}>
            <h3>Client Secret</h3>
            <p>{user?.clientSecret}</p>
          </Col>
        </Row>
      </div>
    </Spin>
  );
};

export default AccountDetail;
