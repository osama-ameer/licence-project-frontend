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

const License = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [license, setLicense] = useState([]);
  const [modalData, setModalData] = useState();
  const [codeSnippet, setSnippet] = useState();
  const navigate = useNavigate();
  const user = getItemFromLocalStorage("user");

  const columns = [
    {
      title: "License Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "License Cost",
      dataIndex: "cost",
      key: "cost",
    },

    {
      title: "Duration Type",
      dataIndex: "durationType",
      key: "durationType",
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
            onClick={() => navigate(`/view-license/${record._id}`)}
          />
          <EditOutlined
            title="Edit"
            className="icons_style"
            onClick={() => {
              navigate(`/license/${record?._id}`);
            }}
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
      title: `Are you sure you want to delete this license?`,
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
      let response = await api.delete(`/license/${id}`);
      setLicense((prevLicense) =>
        prevLicense.filter((license) => license._id !== id)
      );
      message.success("License deleted");
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  useEffect(() => {
    fetchLicenses();
  }, []);

  const fetchLicenses = async () => {
    setLoading(true);
    try {
      let response = await api.get(`/license`);
      setLicense(response?.data?.licenses);
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
        setLicense((prevProjects) => [
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
        setLicense((prevProjects) => {
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
        <Button
          type="primary"
          onClick={() => {
            navigate(`/license/create`);
            setModalData();
            displayModal();
          }}
        >
          Create License
        </Button>
      </div>
      <br />
      <Table
        rowKey={(record) => record._id}
        size="small"
        loading={loading}
        columns={columns}
        dataSource={license}
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
export default License;
