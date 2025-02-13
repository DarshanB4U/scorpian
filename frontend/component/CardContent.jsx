// CardContent.js
import React from "react";

export function CardContent({ children, className = "" }) {
  return <div className={`p-4 text-gray-700 ${className}`}>{children}</div>;
}