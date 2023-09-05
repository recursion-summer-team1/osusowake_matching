import React from 'react';

interface HeaderProps {
  title: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ title, className }) => {
  return (
    <header className={`sticky inset-x-0 top-0 bg-primary py-2 ${className}`}>
      <h1 className="text-center">{title}</h1>
    </header>
  );
};

export default Header;
