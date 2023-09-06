import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

const FooterBar: React.FC = () => {
  const location = useLocation();
  const activeDict = useMemo(() => {
    const pathNames = [
      "food-list",
      "food-registration",
      "chat",
      "deal-list",
    ] as const;
    const obj = {} as {
      [Key in (typeof pathNames)[number]]: string;
    };
    pathNames.forEach((s) => {
      obj[s] = location.pathname === `/${s}` ? "active" : "";
    });
    return obj;
  }, [location]);

  return (
    <footer className="sticky btm-nav-sm bottom-0 btm-nav">
      {/* <div className="container mx-auto text-center">
        <div className="btm-nav flex justify-around"> */}
      <Link
        to="/food-list"
        className={`${activeDict["food-list"]} flex-1 text-center text-info`}
      >
        {/* Your icon for Product List */}
        🍎
      </Link>
      <Link
        to="/food-registration"
        className={`${activeDict["food-registration"]} flex-1 text-center text-info`}
      >
        {/* Your icon for Product Detail */}
        📝
      </Link>
      <Link
        to="/chat"
        className={`${activeDict["chat"]} flex-1 text-center text-info`}
      >
        {/* Your icon for Chat */}
        💬
      </Link>
      <Link
        to="/deal-list"
        className={`${activeDict["deal-list"]} flex-1 text-center text-info`}
      >
        {/* Your icon for Transaction List */}
        📋
      </Link>
      {/* </div>
      </div> */}
    </footer>
  );
};

export default FooterBar;
