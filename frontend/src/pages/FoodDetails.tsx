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
  console.log(id);
  const [foodItem, setFoodItem] = useState<FoodItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showPurchasePopup, setShowPurchasePopup] = useState(false);
  const [initialMessage, setInitialMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get<FoodItem>(`http://localhost:3000/foods/soro/${id}`)
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

  const userId = 1;

  const createDealAndChat = async () => {
    console.log("foodId:", foodItem.foodId);
    console.log("userId", userId);
    // Create a new deal
    const dealResponse = await axios.post("http://localhost:3000/deals", {
      requesterId: userId,
      foodId: foodItem.foodId,
      isComplete: false,
    });

    const dealId = dealResponse.data.insertId;
    console.log("dealId", dealId);
    console.log("Initial message:", initialMessage);

    // Create a new chat message
    await axios.post("http://localhost:3000/chats", {
      dealId: dealId,
      senderId: userId,
      content: initialMessage,
    });
  };

  const handleSubmit = async () => {
    setShowModal(false);
    setShowPurchasePopup(true);
    // Create deal and chat
    await createDealAndChat();
  };

  const closePurchasePopup = () => {
    setShowPurchasePopup(false);
    navigate("/food-list");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}/${month}/${day}`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Food Details" className="z-50" />
      <div className="flex-grow overflow-y-auto p-4 flex items-center justify-center">
        <div className="text-center">
          <img
            src={
              foodItem.foodImageUrl.startsWith("http")
                ? foodItem.foodImageUrl
                : `http://localhost:3000/images/foods/${foodItem.foodImageUrl}`
            }
            alt={foodItem.foodName}
            className="w-full h-full object-cover"
          />
          <h1 className="text-2xl font-bold">{foodItem.foodName}</h1>
          <p className="text-lg">Owner: {foodItem.userId}</p>
          <p className="text-lg">
            Expiration Date: {formatDate(foodItem.expirationDate)}
          </p>
          <p className="text-lg">Quantity: {foodItem.quantity}</p>

          <div className="mt-6">
            <h2 className="text-xl font-semibold">Description:</h2>
            <p className="text-lg">{foodItem.description}</p>
          </div>

          <button
            className="btn btn-success shadow w-[full-2] sticky top-12  p-2 rounded mt-4 ml-4"
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
                className="btn btn-error shadow w-[full-2] p-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-success shadow w-[full-2] p-2 rounded"
                onClick={handleSubmit}
              >
                Submit
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
              className="btn btn-accent shadow w-[full-2] p-2 rounded"
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
