import React, { useEffect } from "react";
import { Button, Form, Input, Modal, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import "./index.css";
const { TextArea } = Input;
const NewProjectModal = ({
  modalData,
  open,
  onCreate,
  onCancel,
  onUpdate,
  code,
}) => {
  const [modalForm] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (modalData) {
        modalForm.setFieldsValue(modalData);
      } else {
        modalForm.resetFields();
      }
    }
  }, [open, modalData, modalForm]);

  const handleOk = async (values) => {
    modalForm
      .validateFields()
      .then((values) => {
        modalForm.resetFields();
        if (modalData?._id) {
          onUpdate(values, modalData?._id);
        } else {
          onCreate(values);
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    message.info("Copied!");
  };

  return (
    <Modal
      open={open}
      title="Create new project"
      footer={false}
      onCancel={onCancel}
      afterClose={() => modalForm.resetFields()}
    >
      <Form
        form={modalForm}
        layout="vertical"
        name="form_in_modal"
        onFinish={handleOk}
      >
        <Form.Item
          name="name"
          label="Project Name"
          rules={[
            {
              required: true,
              message: "Please input your project name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="url" label="Project URL">
          <Input type="textarea" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          {modalData?._id ? "Update" : "Create"}
        </Button>
      </Form>
      <br />
      {!modalData?._id && (
        <>
          <div className="" style={{ textAlign: "end" }}>
            <div className="snippet-header">
              <span>Create project to generate code snippet</span>
              <div className="copy-btn" onClick={handleCopy}>
                <CopyOutlined />
                Copy
              </div>
            </div>
          </div>
          <TextArea
            style={{ height: 120 }}
            placeholder="Widget Name"
            value={code}
            disabled={true}
          />
        </>
      )}
    </Modal>
  );
};

export default NewProjectModal;
