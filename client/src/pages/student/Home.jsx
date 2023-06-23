import React from "react";
import { Avatar, Button, Card, Space } from "antd";
import {
  PoweroffOutlined,
  FileOutlined,
  ExclamationCircleOutlined,
  HomeOutlined,
  BookOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../../store/authStore";

const HomePage = () => {
  const navigate = useNavigate();
  const { removeAuth } = useAuthStore();

  const handleLogout = () => {
    removeAuth();
    navigate("/");
  };

  return (
    <div className="home-page">
      <div className="home-page__navbar">
        <div className="home-page__navbar-title">Student Portal</div>
        <Space>
          <Button
            className="home-page__logout-button"
            type="primary"
            icon={<PoweroffOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Button>
          <Button
            type="primary"
            shape="circle"
            icon={<UserOutlined />}
            size="large"
            onClick={() => navigate("/student/profile")}
          />
        </Space>
      </div>
      <div className="home-page__card-container">
        <Card
          className="home-page__card"
          title="Leaves"
          bordered={false}
          onClick={() => navigate("/student/leaves")}
        >
          <FileOutlined className="home-page__card-icon" />
        </Card>
        <Card
          className="home-page__card"
          title="Complaints"
          bordered={false}
          onClick={() => navigate("/student/complaints")}
        >
          <ExclamationCircleOutlined className="home-page__card-icon" />
        </Card>
        <Card
          className="home-page__card"
          title="Room Details"
          bordered={false}
          onClick={() => navigate("/student/room-details")}
        >
          <HomeOutlined className="home-page__card-icon" />
        </Card>
        <Card className="home-page__card" title="Courses" bordered={false}>
          <BookOutlined className="home-page__card-icon" />
        </Card>
        <Card className="home-page__card" title="Mess" bordered={false}>
          <EnvironmentOutlined className="home-page__card-icon" />
        </Card>
        <Card className="home-page__card" title="Events" bordered={false}>
          <CalendarOutlined className="home-page__card-icon" />
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
