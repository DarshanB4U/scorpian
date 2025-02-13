import React, { useState } from "react";
import axios from "axios";
import { Button } from "./Button";
import { Card } from "./Card";
import { CardContent } from "./CardContent";
import { Header } from "./Header";
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
      const response = await axios.post(
        "https://your-backend.com/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setDetectionResult(response.data);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  return (
    <div>
      <div>
        <Header title={"Scorpin"}></Header>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 px-12 m-3">
        <Card className="w-96 p-4">
          <CardContent>
            <input
              className="bg-"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="rounded-xl mb-4 w-full "
              />
            )}
            <Button onClick={handleUpload} className="w-full">
              Upload & Detect
            </Button>
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
    </div>
  );
}
