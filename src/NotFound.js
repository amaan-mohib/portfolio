import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found">
      <h1 className="nf404">404</h1>
      <p className="nf404-p">
        Oops, the page you're looking for does not exists
      </p>
      <Link to="/" className="port" style={{ color: "#fff" }}>
        GO HOME
      </Link>
    </div>
  );
}
