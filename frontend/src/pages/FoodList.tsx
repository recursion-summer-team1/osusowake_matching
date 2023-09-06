import React, { useEffect, useState } from "react";
import FooterBar from "../components/FooterBar";
import Header from "../components/Header";
import axios from "axios";
import { Link } from "react-router-dom";

interface FoodItem {
  foodId: number;
  userId: number;
  foodName: string;
  foodImageUrl: string;
  isSoldOut: number;
  expirationDate: string;
  quantity: number;
  unit: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}


const FoodList: React.FC = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]); // State to hold the fetched food items

  useEffect(() => {
    // Fetch food items from the API when the component mounts
    axios.get<FoodItem[]>("http://localhost:3000/foods")
      .then(response => {
        setFoodItems(response.data); // Update the state with the fetched data
      })
      .catch(error => {
        console.error("There was an error fetching the food items:", error);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header title="Food List" className="z-50" />

      {/* Scrollable Food Items Grid */}
      <div className="flex-grow overflow-y-auto">
        <div className="grid grid-cols-2 gap-4 p-4">
          {foodItems.map((item) => (
            <div key={item.foodId} className="relative">
              <Link to={`/food-details/${item.foodId}`}>
                <img
                  src={item.foodImageUrl}
                  alt={item.foodName}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 right-2 bg-white bg-opacity-50 text-black rounded">
                  {item.foodName}
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
