import React from "react";
import { Card, Avatar } from "antd";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import useAuthStore from "../../store/authStore";

const ProfilePage = () => {
  const name = "test1";
  const regNo = "123456789";
  const block = "A";
  const { auth, setAuth } = useAuthStore((state) => state);

  return (
    <div className="profile-page">
      <Card className="profile-page__card" title="Profile">
        <Avatar size={60} icon={<UserOutlined />} />
        <div className="profile-page__details">
          <p>
            <strong>Name:</strong> {auth?.data?.name}
          </p>
          <p>
            <strong>Registration Number:</strong> {auth?.data?.regNo}
          </p>
          <p>
            <strong>Block:</strong> {auth?.data?.block}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
