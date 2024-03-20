import React, { useState, useCallback, useEffect } from "react";
import { Button, Space, Table, Modal, message } from "antd";
import "./index.css";
import NewProjectModal from "./components/NewProjectModal";
import { api } from "../../services/api";
import { getItemFromLocalStorage } from "../../services/localStorage";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { generateCode, getDate } from "../../services/utils";
import moment from "moment";
const { confirm } = Modal;

const Users = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [modalData, setModalData] = useState();
  const [codeSnippet, setSnippet] = useState();
  const navigate = useNavigate();
  const user = getItemFromLocalStorage("user");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => getDate(value),
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
            onClick={() => navigate(`/view-user/${record._id}`)}
          />
          <EditOutlined
            title="Edit"
            className="icons_style"
            onClick={() => navigate(`/user/${record?._id}`)}
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
      let response = await api.delete(`/users/${id}`);
      setUsers((prevLicense) =>
        prevLicense.filter((license) => license._id !== id)
      );
      message.success("Account deleted");
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      let response = await api.get(`/users`);
      setUsers(response?.data?.users);
    } catch (error) {
      console.log("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const onCreate = useCallback(
    async (values) => {
      try {
        let response = await api.post(`/users/${user?._id}`, values);

        setUsers((prevUsers) => [...prevUsers, response?.data?.project]);
        let updateCodeSinppet = {
          ...response?.data?.user,
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
    async (values, userId, type = "edit") => {
      try {
        let response = await api.put(`/users/${userId}`, values);
        setUsers((prevUsers) => {
          const index = prevUsers.findIndex((user) => user._id === userId);

          const updatedUsers = [...prevUsers];
          updatedUsers[index] = response?.data?.users;

          return updatedUsers;
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
        <Button type="primary" onClick={() => navigate(`/user/create`)}>
          Create User
        </Button>
      </div>
      <br />
      <Table
        rowKey={(record) => record._id}
        size="small"
        loading={loading}
        columns={columns}
        dataSource={users}
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
export default Users;
