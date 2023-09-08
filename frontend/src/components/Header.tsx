import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ title, className }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // This will navigate back
  };

  const shouldShowBackButton =
    location.pathname.startsWith("/food-details/") ||
    location.pathname.startsWith("/chat/");

  return (
    <header className={`sticky glass inset-x-0 top-0 shadow-md ${className}`}>
      <div className="container navbar mx-auto justify-center items-center">
        {shouldShowBackButton ? (
          <div className="navbar-start">
            <button
              onClick={handleBackClick}
              className="btn btn-ghost rounded bg-business text-business"
            >
              <span className="i-fluent-arrow-circle-left-32-regular text-3xl text-info" />
            </button>
          </div>
        ) : (
          <div className="navbar-start" />
        )}
        <div className="navbar-center">
          <h1 className="text-business font-semibold text-xl tracking-wider">
            {title}
          </h1>
        </div>
        <div className="navbar-end" />
      </div>
    </header>
  );
};

export default Header;
