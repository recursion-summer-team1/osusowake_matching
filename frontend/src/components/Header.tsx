import React from "react";

interface HeaderProps {
  title: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ title, className }) => {
  return (
    <header className={`sticky inset-x-0 top-0 py-5 shadow-md ${className}`}>
      <div className="container mx-auto flex justify-center items-center">
        <h1 className="text-center text-business font-semibold text-xl tracking-wider">{title}</h1>
      </div>
    </header>
  );
};

export default Header;
