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
      "me",
    ] as const;
    const obj = {} as {
      [Key in (typeof pathNames)[number]]: string;
    };
    pathNames.forEach((s) => {
      obj[s] = location.pathname === `/${s}` ? "active text-info" : "text-base-content text-opacity-40";
    });
    return obj;
  }, [location]);

  return (
    <footer className="sticky btm-nav-sm bottom-0 btm-nav border-t">
      {/* <div className="container mx-auto text-center">
        <div className="btm-nav flex justify-around"> */}
      <Link
        to="/food-list"
        className={`${activeDict["food-list"]} flex-1 text-center`}
      >
        {/* Your icon for Product List */}
        <div className="flex flex-col items-center h-full">
          <span className="i-uil-food text-3xl" />
          <span className="text-xs">Foods</span>
        </div>
      </Link>
      <Link
        to="/food-registration"
        className={`${activeDict["food-registration"]} flex-1 text-center`}
      >
        {/* Your icon for Product Detail */}
        <div className="flex flex-col items-center">
          <span className="i-uil-camera text-3xl" />
          <span className="text-xs">Register</span>
        </div>
      </Link>
      <Link
        to="/chat"
        className={`${activeDict["chat"]} flex-1 text-center`}
      >
        {/* Your icon for Chat */}
        <div className="flex flex-col items-center">
          <span className="i-fluent-chat-24-regular text-3xl" />
          <span className="text-xs">Chat</span>
        </div>
      </Link>
      <Link
        to="/deal-list"
        className={`${activeDict["deal-list"]} flex-1 text-center`}
      >
        {/* Your icon for Transaction List */}
        {/* 📋 */}
        <div className="flex flex-col items-center">
          <span className="i-fluent-chat-24-regular text-3xl" />
          <span className="text-xs">Deals</span>
        </div>
      </Link>
      <Link
        to="/me"
        className={`${activeDict["me"]} flex-1 text-center`}
      >
        {/* Your icon for My Page */}
        <div className="flex flex-col items-center">
          <span className="i-fluent-person-24-regular text-3xl" />
          <span className="text-xs">My Page</span>
        </div>
      </Link>
      {/* </div>
      </div> */}
    </footer>
  );
};

export default FooterBar;
