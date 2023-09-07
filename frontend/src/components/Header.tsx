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
    <header className={`sticky inset-x-0 top-0 py-5 shadow-md ${className}`}>
      <div className="container mx-auto flex justify-center items-center">
        {shouldShowBackButton && (
          <button
            onClick={handleBackClick}
            className="mr-4 p-2 rounded bg-business text-business"
          >
            Back
          </button>
        )}
        <h1 className="text-center text-business font-semibold text-xl tracking-wider">{title}</h1>
      </div>
    </header>
  );
};

export default Header;
