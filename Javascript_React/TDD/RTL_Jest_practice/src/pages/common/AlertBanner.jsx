import React from "react";

export default function AlertBanner({ message, variant }) {
  const alertMessage =
    message || "An unexpected error occurred. Please try again later.";
  const alertVariant = variant || "danger";

  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "red",
        color: "white",
        textAlign: "center",
      }}
    >
      {alertMessage}
    </div>
  );
}
