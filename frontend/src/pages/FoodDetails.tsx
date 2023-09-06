import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import FooterBar from "../components/FooterBar";

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

const FoodDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [foodItem, setFoodItem] = useState<FoodItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showPurchasePopup, setShowPurchasePopup] = useState(false);
  const [initialMessage, setInitialMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get<FoodItem>(`http://localhost:3000/foods/${id}`)
        .then((response) => {
          setFoodItem(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the food item:", error);
        });
    }
  }, [id]);

  if (!foodItem) {
    return <div>Loading or Item not found...</div>;
  }

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleSubmit = () => {
    console.log("Initial message:", initialMessage);
    setShowModal(false);
    setShowPurchasePopup(true);
  };

  const closePurchasePopup = () => {
    setShowPurchasePopup(false);
    navigate("/food-list");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Food Details" className="z-50" />
      <div className="flex-grow overflow-y-auto p-4 flex items-center justify-center">
        <div className="text-center">
          <img
            src={foodItem.foodImageUrl}
            alt={foodItem.foodName}
            className="w-full h-auto mb-4"
          />
          <h1 className="text-2xl font-bold">{foodItem.foodName}</h1>
          <p className="text-lg">Owner: {foodItem.userId}</p>
          <p className="text-lg">Expiration Date: {foodItem.expirationDate}</p>
          <p className="text-lg">Quantity: {foodItem.quantity}</p>

          <div className="mt-6">
            <h2 className="text-xl font-semibold">Description:</h2>
            <p className="text-lg">{foodItem.description}</p>
          </div>

          <button
            className="bg-blue-500 text-white p-2 rounded mt-4"
            onClick={handleButtonClick}
          >
            I want it!
          </button>
        </div>
      </div>

      <FooterBar />

      {/* Initial Message Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-100">
          <div className="bg-white p-4 rounded">
            <h2>Initial Message</h2>
            <input
              type="text"
              value={initialMessage}
              onChange={(e) => setInitialMessage(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <div className="flex justify-between mt-4">
              <button
                className="bg-green-500 text-white p-2 rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Purchase Completed Popup */}
      {showPurchasePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-100">
          <div className="bg-white p-4 rounded">
            <h2>Purchase Completed</h2>
            <p>You have successfully purchased {foodItem.foodName}.</p>
            <button
              className="bg-blue-500 text-white p-2 rounded mt-4"
              onClick={closePurchasePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetails;
