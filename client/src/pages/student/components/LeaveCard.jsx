import React from "react";
import moment from "moment";
import { Card, Tag } from "antd";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const LeaveCard = ({ leave }) => {
  const getStatusIcon = () => {
    if (leave.isApproved) {
      return (
        <CheckCircleOutlined className="leave-card__status-icon--approved" />
      );
    } else if (leave.isRejected) {
      return (
        <CloseCircleOutlined className="leave-card__status-icon--rejected" />
      );
    } else {
      return (
        <ClockCircleOutlined className="leave-card__status-icon--pending" />
      );
    }
  };

  return (
    <>
      <Card
        className="complaints-page__complaint-item"
        style={{ marginBottom: 20 }}
      >
        <h4 className="complaints-page__complaint-item-type">
          Leave Type: {leave.leaveType}
        </h4>
        <p className="complaints-page__complaint-item-date">
          Leave Date: {moment(leave.leaveDate).format("MMM DD, YYYY")}
        </p>
        <p className="complaints-page__complaint-item-date">
          Leave Time: {moment(leave.leaveTime).format("MMM DD, YYYY")}
        </p>
        <p className="complaints-page__complaint-item-description">
          Leave Duration: {leave.LeaveDuration}
        </p>

        <div className="complaints-page__complaint-item-status">
          {leave.isApproved ? (
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
    </>
  );
};

export default LeaveCard;
