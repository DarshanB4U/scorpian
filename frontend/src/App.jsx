import React, { useState } from "react";
import { Button } from "../component/Button";
import { Card } from "../component/Card";
import { CardContent } from "../component/CardContent";
import axios from "axios";

export default function VehicleDetection() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post("https://your-backend.com/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setDetectionResult(response.data);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <Card className="w-96 p-4">
        <CardContent>
          <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
          {preview && <img src={preview} alt="Preview" className="rounded-xl mb-4 w-full" />}
          <Button onClick={handleUpload} className="w-full">Upload & Detect</Button>
        </CardContent>
      </Card>
      {detectionResult && (
        <Card className="w-96 p-4 mt-4">
          <CardContent>
            <h3 className="text-xl font-semibold">Detection Result</h3>
            <p>Vehicle Type: {detectionResult.vehicleType}</p>
            <p>Number Plate: {detectionResult.numberPlate}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
