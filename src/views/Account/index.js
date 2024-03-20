import React, { useState, useCallback, useEffect } from "react";
import { Button, Space, Table, Modal, message } from "antd";
import "./index.css";
import NewProjectModal from "./components/NewProjectModal";
import { api } from "../../services/api";
import { getItemFromLocalStorage } from "../../services/localStorage";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { generateCode } from "../../services/utils";
const { confirm } = Modal;

const Account = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [modalData, setModalData] = useState();
  const [codeSnippet, setSnippet] = useState();
  const navigate = useNavigate();
  const user = getItemFromLocalStorage("user");

  const columns = [
    {
      title: "Account Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Company Name",
      dataIndex: "company",
      key: "company",
    },

    {
      title: "License Status",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <EyeOutlined
            title="View"
            className="icons_style"
            onClick={() => navigate(`/view-account/${record.name}`)}
          />
          <EditOutlined
            title="Edit"
            className="icons_style"
            onClick={() => navigate(`/account/${record?.name}`)}
          />
          <DeleteOutlined
            title="Delete"
            className="icons_style"
            onClick={() => showDeleteConfirm(record)}
          />
        </Space>
      ),
    },
  ];

  const showDeleteConfirm = ({ _id }) => {
    confirm({
      title: `Are you sure you want to delete this account?`,
      icon: <DeleteOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(_id);
      },
    });
  };

  const handleDelete = async (id) => {
    try {
      let response = await api.delete(`/account/${id}`);
      setAccounts((prevLicense) =>
        prevLicense.filter((license) => license._id !== id)
      );
      message.success("Account deleted");
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      let response = await api.get(`/account`);
      setAccounts(response?.data?.account);
    } catch (error) {
      console.log("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const onCreate = useCallback(
    async (values) => {
      try {
        let response = await api.post(`/projects/${user?._id}`, values);
        let code = await generateCode(response?.data?.project);
        setSnippet(code);
        setAccounts((prevProjects) => [
          ...prevProjects,
          response?.data?.project,
        ]);
        let updateCodeSinppet = {
          ...response?.data?.project,
          codeSnippet: code,
        };

        await onUpdate(
          updateCodeSinppet,
          response?.data?.project?._id,
          "snippet"
        );
        // setOpen(false);
      } catch (error) {
        console.log("Error: ", error.message);
        setOpen(false);
      }
    },
    [open]
  );

  const onUpdate = useCallback(
    async (values, projectId, type = "edit") => {
      try {
        let response = await api.put(`/projects/${projectId}`, values);
        setAccounts((prevProjects) => {
          const index = prevProjects.findIndex(
            (project) => project._id === projectId
          );

          const updatedProjects = [...prevProjects];
          updatedProjects[index] = response?.data?.project;

          return updatedProjects;
        });
        if (type === "edit") setOpen(false);
      } catch (error) {
        console.log("Error: ", error.message);
        setOpen(false);
      }
    },
    [open]
  );

  const displayModal = () => setOpen(true);
  const hideModal = () => setOpen(false);

  return (
    <>
      <div className="create-btn">
        <Button type="primary" onClick={() => navigate(`/account/create`)}>
          Create Account
        </Button>
      </div>
      <br />
      <Table
        rowKey={(record) => record._id}
        size="small"
        loading={loading}
        columns={columns}
        dataSource={accounts}
      />
      <NewProjectModal
        modalData={modalData}
        open={open}
        onCreate={onCreate}
        onCancel={hideModal}
        onUpdate={onUpdate}
        code={codeSnippet}
      />
    </>
  );
};
export default Account;
