import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../services/api";
import { Button, DatePicker, Form, Input, Spin, message } from "antd";
import dayjs from "dayjs";
import { generateRandomString } from "../../../services/utils";
import moment from "moment";
import { Select, Space } from "antd";

const { RangePicker } = DatePicker;

const CreateAccount = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState();
  const [initialDate, setInitialDate] = useState();

  const [licenses, setLicenses] = useState([]);
  const [defaultLicense, setDefaultLicense] = useState(null);

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (params?.id !== "create") fetchAccount();
  }, [params]);

  const fetchAccount = async () => {
    setLoading(true);
    try {
      let response = await api.get(`/account/${params?.id}`);
      let updatedAcc = {
        ...response?.data?.account,
        expiryDate: dayjs(response?.data?.account?.expiryDate),
      };
      setAccount(updatedAcc);
    } catch (error) {
      console.log("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchLicenses = async () => {
    setLoading(true);
    try {
      let response = await api.get(`/license`);
      let data = response?.data?.licenses?.map((item) => {
        return {
          label: item.name,
          value: item?._id,
        };
      });
      setLicenses(data);
      setDefaultLicense(data[0]?.value);
      const initialDate = moment().add(5, "days");
      setInitialDate(initialDate);
    } catch (error) {
      console.log("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLicenses();
  }, []);

  const createAccount = async (values) => {
    setLoading(true);

    try {
      let response = await api.post(`/account/`, values);
      if (response?.status === 200) {
        message.success("Account created!");
        navigate(`/account`);
      }
    } catch (error) {
      console.log("Error: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const editAccount = async (values) => {
    setLoading(true);
    try {
      let response = await api.put(`/account/${params?.id}`, values);
      if (response?.status === 200) {
        message.success("Account updated!");
        navigate(`/account`);
      }
    } catch (error) {
      console.log("Error: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line arrow-body-style
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };

  const formItemLayout = {
    labelAlign: "left",
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 7,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const getExpStatus = () => {
    if (account && account.status === "ok") {
      return "ok";
    } else if (account && account.expiryDate) {
      const today = new Date();
      const expiryDate = new Date(account.expiryDate);

      if (expiryDate < today) {
        return "expired";
      } else {
        return "trial";
      }
    } else {
      // Handle cases where 'account' is undefined or other conditions
      return "unknown";
    }
  };
  return (
    <Spin spinning={loading}>
      {params?.id !== "create" ? (
        <>
          {account && (
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={params?.id !== "create" ? editAccount : createAccount}
              initialValues={{
                ...account,
                // expiryDate: new Date(account?.expiryDate),
              }}
              scrollToFirstError
            >
              <Form.Item
                name="company"
                label="Company "
                rules={[
                  {
                    required: true,
                    message: "Please input company!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="contactName"
                label="Contact Name"
                rules={[
                  {
                    required: true,
                    message: "Please input Contact name!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="account_email"
                label="Account Email"
                rules={[
                  {
                    required: true,
                    message: "Please input Account email!",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="country"
                label="Country"
                rules={[
                  {
                    required: true,
                    message: "Please input Country!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="license"
                label="Software Type"
                rules={[
                  {
                    required: true,
                    message: "Please select Software Type!",
                    whitespace: true,
                  },
                ]}
              >
                <Select placeholde="Select Software type" options={licenses} />
              </Form.Item>

              <Form.Item
                name="name"
                label="Account ID"
                rules={[
                  {
                    // required: true,
                    message: "Please input Account ID!",
                    whitespace: true,
                  },
                ]}
              >
                <Input disabled={true} />
              </Form.Item>

              <Form.Item name="maxUsers" label="Max Users">
                <Input disabled={true} />
              </Form.Item>

              <Form.Item name="usageCounter" label="Usage Counter">
                <Input disabled={true} />
              </Form.Item>

              <Form.Item
                name="status"
                label="Expiry Status"
                rules={[
                  {
                    // required: true,
                    message: "Please select status!",
                    whitespace: true,
                  },
                ]}
                initialValue={getExpStatus()}
              >
                <Input disabled={true} />
              </Form.Item>
              <Form.Item name="expiryDate" label="Expiry Date">
                <DatePicker
                  disabled={true}
                  format="YYYY-MM-DD "
                  // disabledDate={disabledDate}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button onClick={() => navigate(`/account`)}>Cancel</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: "10px" }}
                >
                  {params?.id !== "create" ? "Edit" : "Create"}
                </Button>
              </Form.Item>
            </Form>
          )}
        </>
      ) : (
        <>
          {!loading && (
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={params?.id !== "create" ? editAccount : createAccount}
              initialValues={account}
              scrollToFirstError
            >
              <Form.Item
                name="company"
                label="Company "
                rules={[
                  {
                    required: true,
                    message: "Please input company!",
                    whitespace: true,
                  },
                ]}
              >
                <Input placeholder="Enter company name" />
              </Form.Item>

              <Form.Item
                name="contactName"
                label="Contact Name"
                rules={[
                  {
                    required: true,
                    message: "Please input Contact name!",
                    whitespace: true,
                  },
                ]}
              >
                <Input placeholder="Enter contact name" />
              </Form.Item>
              <Form.Item
                name="account_email"
                label="Account Email"
                rules={[
                  {
                    required: true,
                    message: "Please input Account email!",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email!",
                  },
                ]}
              >
                <Input placeholder="Enter Account email" />
              </Form.Item>

              <Form.Item
                name="license"
                label="Software Type"
                rules={[
                  {
                    required: true,
                    message: "Please input Software Type!",
                    whitespace: true,
                  },
                ]}
                initialValue={licenses[0]?.value}
              >
                <Select placeholde="Select Software type" options={licenses} />
              </Form.Item>

              <Form.Item
                name="country"
                label="Country"
                rules={[
                  {
                    required: true,
                    message: "Please input Country!",
                    whitespace: true,
                  },
                ]}
              >
                <Input placeholder="Enter Country Name" />
              </Form.Item>

              <Form.Item
                name="name"
                label="Account ID"
                rules={[
                  {
                    // required: true,
                    message: "Please input Account ID!",
                    whitespace: true,
                  },
                ]}
                initialValue={generateRandomString(6)}
              >
                <Input placeholder="Enter Account ID" />
              </Form.Item>

              <Form.Item
                name="maxUsers"
                label="Max Users"
                rules={[
                  {
                    required: true,
                    message: "Please input max users!",
                    whitespace: true,
                  },
                ]}
                initialValue="3"
              >
                <Input placeholder="Enter max users" />
              </Form.Item>

              <Form.Item
                name="usageCounter"
                label="Usage Counter"
                rules={[
                  {
                    required: false,
                    message: "Please input Usage Counter!",
                    whitespace: false,
                  },
                ]}
                initialValue="1"
              >
                <Input placeholder="Enter Usage Counter" />
              </Form.Item>

              <Form.Item
                name="status"
                label="Expiry Status"
                rules={[
                  {
                    // required: true,
                    message: "Please select status!",
                    whitespace: true,
                  },
                ]}
                initialValue="trial"
              >
                <Input disabled={true} />
              </Form.Item>

              <Form.Item
                name="expiryDate"
                label="Expiry Date"
                initialValue={initialDate}
              >
                <DatePicker
                  format="YYYY-MM-DD "
                  disabled={true}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button onClick={() => navigate(`/account`)}>Cancel</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: "10px" }}
                >
                  {params?.id !== "create" ? "Edit" : "Create"}
                </Button>
              </Form.Item>
            </Form>
          )}
        </>
      )}
    </Spin>
  );
};

export default CreateAccount;
