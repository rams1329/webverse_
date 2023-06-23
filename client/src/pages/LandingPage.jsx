import React from "react";
import { Card, Typography } from "antd";
import {
  UserOutlined,
  SolutionOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Navigate, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const { Title } = Typography;

const LandingPage = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuthStore((state) => state);

  if (auth) {
    return <Navigate to="/student/home" />;
  }

  return (
    <div className="landing-page">
      <Title className="landing-page__title">Hostel Management</Title>

      <div className="landing-page__card-container">
        <Card
          className="landing-page__card"
          title="Student"
          hoverable
          onClick={() => navigate("/student/auth")}
        >
          <UserOutlined className="landing-page__card-icon" />
          <p>Manage student information</p>
        </Card>

        <Card className="landing-page__card" title="Warden" hoverable>
          <SolutionOutlined className="landing-page__card-icon" />
          <p>Handle warden tasks</p>
        </Card>

        <Card className="landing-page__card" title="Faculty" hoverable>
          <TeamOutlined className="landing-page__card-icon" />
          <p>Manage faculty details</p>
        </Card>
      </div>
    </div>
  );
};

export default LandingPage;
