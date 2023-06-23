import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Empty,
  Avatar,
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Spin,
} from "antd";
import {
  EyeOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { API } from "../../backend";
import useAuthStore from "../../store/authStore";
import { LeaveCard } from "./components";

const leaves = [
  {
    leaveType: "Casual",
    leaveDate: "2021-05-05",
    leaveTime: "10:00:00",
    leaveDuration: "1",
    isApproved: false,
    isRejected: false,
    studentId: 1,
    wardenId: 1,
  },
];

const LeavesPage = () => {
  const { auth, setAuth } = useAuthStore((state) => state);

  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleApplyLeave = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const fetchLeaves = (token) => {
    // Set the Authorization header with the token
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };

    // Replace API_URL with your actual API endpoint for fetching leaves
    return axios
      .get(`${API}/api/v1/student/leave`, config)
      .then((response) => {
        setLeaves(response.data?.data);
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
      .post(`${API}/api/v1/student/leave`, values, config)
      .then((response) => {
        toast.success("Leave applied Successfully!");
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
        fetchLeaves();
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
    <div className="leaves-page">
      <ToastContainer />
      <div className="leaves-page__header">
        <h2 className="leaves-page__title">Apply and View Leaves</h2>
        <Button
          className="leaves-page__apply-button"
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={handleApplyLeave}
        >
          Apply Leave
        </Button>
      </div>

      <div className="leaves-page__leave-list">
        <h3
          className="leaves-page__leave-list-title"
          style={{ marginBottom: 20 }}
        >
          Your Leaves
        </h3>
        {leaves.length === 0 ? (
          <Empty description="No leaves found" />
        ) : (
          leaves.map((leave, index) => <LeaveCard leave={leave} key={index} />)
        )}
      </div>

      <Modal
        title="Apply Leave"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Leave Type"
            name="leaveType"
            rules={[
              {
                required: true,
                message: "Please enter the leave type",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Leave Date"
            name="leaveDate"
            rules={[
              {
                required: true,
                message: "Please select the leave date",
              },
            ]}
          >
            <DatePicker style={{ width: "100%" }} size="large" />
          </Form.Item>

          <Form.Item
            label="Leave Time"
            name="leaveTime"
            rules={[
              {
                required: true,
                message: "Please select the leave time",
              },
            ]}
          >
            <TimePicker style={{ width: "100%" }} size="large" />
          </Form.Item>

          <Form.Item
            label="Leave Duration"
            name="leaveDuration"
            rules={[
              {
                required: true,
                message: "Please enter the leave duration",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              Apply
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LeavesPage;
