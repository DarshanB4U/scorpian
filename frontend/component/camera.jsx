import React, { useRef, useState, useEffect } from "react";

export default function CameraComponent() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  // Start Camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  // Capture Image
  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      setCapturedImage(canvas.toDataURL("image/png")); // Convert canvas to image
    }
  };

  // Stop Camera
  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera(); // Cleanup on unmount
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">Camera Access</h2>
      
      <video ref={videoRef} autoPlay className="rounded-lg shadow-md w-full max-w-md"></video>

      <canvas ref={canvasRef} width="640" height="480" className="hidden"></canvas>

      <button onClick={captureImage} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow">
        Capture Image
      </button>

      {capturedImage && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Captured Image:</h3>
          <img src={capturedImage} alt="Captured" className="rounded-lg shadow-md mt-2 w-full max-w-md" />
        </div>
      )}
    </div>
  );
}
