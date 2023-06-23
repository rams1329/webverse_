import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Empty,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Spin,
} from "antd";
import {
  EyeOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

import useAuthStore from "../../store/authStore";
import { API } from "../../backend";

const ComplaintsPage = () => {
  const { auth, setAuth } = useAuthStore((state) => state);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleAddComplaint = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const fetchComplaints = (token) => {
    // Set the Authorization header with the token
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };

    // Replace API_URL with your actual API endpoint for fetching leaves
    return axios
      .get(`${API}/api/v1/student/complaint`, config)
      .then((response) => {
        setComplaints(response.data?.data);
      })
      .catch((error) => {
        if (error?.response?.data?.error?.issues?.length) {
          toast.error(
            error?.response?.data?.error?.issues[0]?.path[0] +
              " " +
              error?.response?.data?.error?.issues[0]?.code
          );
        } else {
          toast.error(error?.response?.data?.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onFinish = (values) => {
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };

    axios
      .post(`${API}/api/v1/student/complaint`, values, config)
      .then((response) => {
        toast.success("Complaint submitted Successfully!");
      })
      .catch((error) => {
        if (error?.response?.data?.error?.issues?.length) {
          toast.error(
            error?.response?.data?.error?.issues[0]?.path[0] +
              " " +
              error?.response?.data?.error?.issues[0]?.code
          );
        } else {
          toast.error(error?.response?.data?.message);
        }
      })
      .finally(() => {
        setIsModalVisible(false);
        fetchComplaints();
      });
  };

  if (loading) {
    return (
      <div style={{ padding: 5 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="complaints-page">
      <div className="complaints-page__header">
        <h2 className="complaints-page__title">Complaints</h2>
        <Button
          className="complaints-page__add-button"
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={handleAddComplaint}
        >
          Submit Complaint
        </Button>
      </div>

      <div className="complaints-page__complaint-list">
        <h3 className="complaints-page__complaint-list-title">
          Your Complaints
        </h3>
        {complaints.length === 0 ? (
          <Empty description="No complaints found" />
        ) : (
          complaints.map((complaint) => (
            <Card
              className="complaints-page__complaint-item"
              key={complaint.id}
            >
              <h4 className="complaints-page__complaint-item-type">
                Complaint Type: {complaint.complaintType}
              </h4>
              <p className="complaints-page__complaint-item-date">
                Complaint Date:{" "}
                {moment(complaint.complaintDate).format("MMM DD, YYYY")}
              </p>
              <p className="complaints-page__complaint-item-description">
                Description: {complaint.complaintDescription}
              </p>
              <p className="complaints-page__complaint-item-severity">
                Severity: {complaint.complaintSeverity}
              </p>
              <div className="complaints-page__complaint-item-status">
                {complaint.isResolved ? (
                  <div className="complaints-page__complaint-item-status-indicator resolved">
                    <CheckCircleOutlined className="complaints-page__complaint-item-status-icon" />
                    <span>Resolved</span>
                  </div>
                ) : (
                  <div className="complaints-page__complaint-item-status-indicator pending">
                    <ExclamationCircleOutlined className="complaints-page__complaint-item-status-icon" />
                    <span>Pending</span>
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>

      <Modal
        title="Submit Complaint"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Complaint Type"
            name="complaintType"
            rules={[
              { required: true, message: "Please select complaint type" },
            ]}
          >
            <Select placeholder="Select complaint type" size="large">
              <Select.Option value="Electrical">Electrical</Select.Option>
              <Select.Option value="Plumbing">Plumbing</Select.Option>
              <Select.Option value="Hostel">Hostel</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Complaint Date"
            name="complaintDate"
            rules={[
              { required: true, message: "Please select complaint date" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} size="large" />
          </Form.Item>
          <Form.Item
            label="Complaint Description"
            name="complaintDescription"
            rules={[
              { required: true, message: "Please enter complaint description" },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Complaint Severity"
            name="complaintSeverity"
            rules={[
              { required: true, message: "Please select complaint severity" },
            ]}
          >
            <Select size="large">
              <Select.Option value="High">High</Select.Option>
              <Select.Option value="Low">Low</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ComplaintsPage;
