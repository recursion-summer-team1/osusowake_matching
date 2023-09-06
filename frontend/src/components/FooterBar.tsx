import React from "react";
import { Link } from "react-router-dom";

const FooterBar: React.FC = () => {
  return (
    <footer className="fixed inset-x-0 bottom-0 bg-primary py-2">
      <div className="container mx-auto text-center">
        <div className="flex justify-around">
          <Link to="/food-list" className="flex-1 text-center text-white">
            🍎
          </Link>
          <Link
            to="/food-registration"
            className="flex-1 text-center text-white"
          >
            📝
          </Link>
          <Link to="/chat" className="flex-1 text-center text-white">
            💬
          </Link>
          <Link
            to="/transaction-list"
            className="flex-1 text-center text-white"
          >
            📋
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default FooterBar;
