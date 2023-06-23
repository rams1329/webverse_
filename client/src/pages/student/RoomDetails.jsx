import React from "react";
import { Card } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const roomDetails = {
  id: 4,
  roomNo: "A-105",
  roomType: "AC",
  roomCapacity: 2,
  block: "A",
  isFull: false,
};

const RoomDetailsPage = () => {
  return (
    <div className="room-details-page">
      <Card className="room-details-page__card">
        <h3 className="room-details-page__card-title">Room Details</h3>
        <div className="room-details-page__card-content">
          <p className="room-details-page__card-info">
            <span className="room-details-page__card-info-icon">
              <InfoCircleOutlined />
            </span>
            <span className="room-details-page__card-info-label">
              Room Number:
            </span>
            {roomDetails.roomNo}
          </p>
          <p className="room-details-page__card-info">
            <span className="room-details-page__card-info-icon">
              <InfoCircleOutlined />
            </span>
            <span className="room-details-page__card-info-label">
              Room Type:
            </span>
            {roomDetails.roomType}
          </p>
          <p className="room-details-page__card-info">
            <span className="room-details-page__card-info-icon">
              <InfoCircleOutlined />
            </span>
            <span className="room-details-page__card-info-label">
              Room Capacity:
            </span>
            {roomDetails.roomCapacity}
          </p>
          <p className="room-details-page__card-info">
            <span className="room-details-page__card-info-icon">
              <InfoCircleOutlined />
            </span>
            <span className="room-details-page__card-info-label">Block:</span>
            {roomDetails.block}
          </p>
          <p className="room-details-page__card-info">
            <span className="room-details-page__card-info-icon">
              <InfoCircleOutlined />
            </span>
            <span className="room-details-page__card-info-label">
              Availability:
            </span>
            {roomDetails.isFull ? "Full" : "Available"}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default RoomDetailsPage;
