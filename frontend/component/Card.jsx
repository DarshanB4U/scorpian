// Card.js
import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white shadow-xl rounded-3xl p-6 border border-gray-200 ${className}`}>{children}</div>
  );
}