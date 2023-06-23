import React, { useState } from "react";
import { Form, Input, Button, Tabs, Select } from "antd";
import {
  UserOutlined,
  LockOutlined,
  SolutionOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { API } from "../../backend";
import useAuthStore from "../../store/authStore";

const { TabPane } = Tabs;
const { Option } = Select;

const StudentRegisterPage = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuthStore((state) => state);
  const [loading, setLoading] = useState(false);

  const handleLoginFinish = (values) => {
    setLoading(true);
    // Make API call to login student using the provided API endpoint
    // Replace 'apiEndpoint' with the actual API endpoint for student login
    axios
      .post(`${API}/api/v1/student/auth/login`, values)
      .then((response) => {
        setAuth(response.data);
        setLoading(false);
        navigate("/student/home");
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
        setLoading(false);
      });
  };

  const handleRegisterFinish = (values) => {
    setLoading(true);
    // Make API call to login student using the provided API endpoint
    // Replace 'apiEndpoint' with the actual API endpoint for student login
    axios
      .post(`${API}/api/v1/student/auth/register`, values)
      .then((response) => {
        toast.success("Registered successfully. Please login");

        setLoading(false);
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
        setLoading(false);
      });
  };

  if (auth) {
    return <Navigate to="/student/home" />;
  }

  return (
    <div className="student-register-page">
      <ToastContainer />
      <div className="student-register-page__header">
        <h2 className="student-register-page__title">Student Registration</h2>
      </div>
      <Tabs
        className="student-register-page__tabs"
        defaultActiveKey="login"
        centered
      >
        <TabPane tab="Login" key="login">
          <Form
            className="student-register-page__form"
            name="student-login-form"
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={handleLoginFinish}
          >
            <Form.Item
              className="student-register-page__form-item"
              label="Reg No"
              name="regNo"
              rules={[
                {
                  required: true,
                  message: "Please enter your regNo",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                className="student-register-page__input"
                size="large"
              />
            </Form.Item>
            <Form.Item
              className="student-register-page__form-item"
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                className="student-register-page__input"
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Button
                className="student-register-page__button"
                type="primary"
                htmlType="submit"
                loading={loading}
                block
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Register" key="register">
          <Form
            className="student-register-page__form"
            name="student-register-form"
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={handleRegisterFinish}
          >
            <Form.Item
              className="student-register-page__form-item"
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter your name",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                className="student-register-page__input"
                size="large"
              />
            </Form.Item>
            <Form.Item
              className="student-register-page__form-item"
              label="Registration Number"
              name="regNo"
              rules={[
                {
                  required: true,
                  message: "Please enter your registration number",
                },
              ]}
            >
              <Input
                prefix={<SolutionOutlined />}
                className="student-register-page__input"
                size="large"
              />
            </Form.Item>
            <Form.Item
              className="student-register-page__form-item"
              label="Room No"
              name="roomNo"
              rules={[
                {
                  required: true,
                  message: "Please enter your room no",
                },
              ]}
            >
              <Input
                prefix={<HomeOutlined />}
                className="student-register-page__input"
                size="large"
              />
            </Form.Item>
            <Form.Item
              className="student-register-page__form-item"
              label="Hostel Block Name"
              name="block"
              rules={[
                {
                  required: true,
                  message: "Please select your hostel block name",
                },
              ]}
            >
              <Select
                placeholder="Select a hostel block"
                className="student-register-page__input"
                size="large"
              >
                <Option value="A">A</Option>
                <Option value="B">B</Option>
                <Option value="C">C</Option>
                <Option value="D">D</Option>
              </Select>
            </Form.Item>
            <Form.Item
              className="student-register-page__form-item"
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter a password",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                className="student-register-page__input"
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Button
                className="student-register-page__button"
                type="primary"
                htmlType="submit"
                loading={loading}
                block
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default StudentRegisterPage;
