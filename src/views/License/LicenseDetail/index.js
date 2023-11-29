import React, { useEffect, useState, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Spin } from "antd";
import { api } from "../../../services/api";
import { ArrowLeftOutlined, CopyOutlined } from "@ant-design/icons";
import { Row, Col, Input, message } from "antd";
import "./index.css";

const { TextArea } = Input;
const LicenseDetail = () => {
  const [license, setLicense] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    const fetchLicense = async (licenseId) => {
      setLoading(true);
      try {
        let response = await api.get(`/license/${licenseId}`);
        console.log(response);
        setLicense(response?.data?.license);
      } catch (error) {
        console.log("Error: ", error.message);
      } finally {
        setLoading(false);
      }
    };
    if (params?.id) fetchLicense(params.id);
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
            <h3>License Name</h3>
            <p>{license?.name}</p>
          </Col>
          <Col lg={12} xs={24}>
            <h3>License Description</h3>
            <p>{license?.description}</p>
          </Col>
          <Col lg={12} xs={24}>
            <h3>License Cost</h3>
            <p>{license?.cost}</p>
          </Col>
          <Col lg={12} xs={24}>
            <h3>Duration Type</h3>
            <p>{license?.durationType}</p>
          </Col>
        </Row>
      </div>
    </Spin>
  );
};

export default LicenseDetail;
