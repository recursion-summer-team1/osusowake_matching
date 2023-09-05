import React from "react";
import FooterBar from "../components/FooterBar";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { foodItems } from "./DummyFoodData";

const FoodList: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header title="Food List" className="z-50" />

      {/* Scrollable Food Items Grid */}
      <div className="flex-grow overflow-y-auto">
        <div className="grid grid-cols-2 gap-4 p-4">
          {foodItems.map((item) => (
            <div key={item.foodid} className="relative">
              <Link to={`/food-details/${item.foodid}`}>
                <img
                  src={item.foodImageUrl}
                  alt={item.userId}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 right-2 bg-white bg-opacity-50 text-black rounded">
                  {item.userId}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <FooterBar />
    </div>
  );
};

export default FoodList;
