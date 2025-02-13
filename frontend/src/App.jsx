import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VehicleDetection from "../component/VehicalDetection"; // Corrected filename
import CameraComponent from "../component/camera";

export default function App() {  // Changed function name from 'main' to 'App'
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <h1 className="text-center text-3xl mt-10">
              Welcome to Vehicle Detection
            </h1>
          }
        />
        <Route path="/upload" element={<VehicleDetection />} />
        <Route path="/camera" element={<CameraComponent />} />
      </Routes>
    </Router>
  );
}

