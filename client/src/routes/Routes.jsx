import React from "react";
import {
  BrowserRouter as Router,
  Routes as RoutesList,
  Route,
  BrowserRouter,
  Navigate,
} from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import {
  Auth,
  Complaints,
  Home,
  Leaves,
  Profile,
  RoomDetails,
} from "../pages/student";
import { LandingPage, PageNotFound } from "../pages";

const Routes = () => {
  return (
    <BrowserRouter>
      <RoutesList>
        <Route path="/" element={<LandingPage />} />
        <Route path="/student/auth" element={<Auth />} />
        <Route
          path="/student/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/leaves"
          element={
            <PrivateRoute>
              <Leaves />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/complaints"
          element={
            <PrivateRoute>
              <Complaints />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/room-details"
          element={
            <PrivateRoute>
              <RoomDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </RoutesList>
    </BrowserRouter>
  );
};

export default Routes;
