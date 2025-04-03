import React from "react";

export const Footer = () => {
  return (
    <footer className="text-center text-lg-start bg-body-tertiary text-muted">
      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        Design and Developed by : &nbsp;
        <a
          className="text-reset fw-bold"
          href="https://www.facebook.com/koushik1998"
          target="_blank"
          rel="noreferrer"
        >
          Koushik
        </a>
      </div>
    </footer>
  );
};
