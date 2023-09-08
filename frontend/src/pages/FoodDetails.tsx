import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import FooterBar from "../components/FooterBar";
import { useRecoilValue } from "recoil";
import { myUserState } from "../utils/myUserState";
import { serverHostName } from "../utils/serverHostName";
import toast from "react-hot-toast";

interface FoodItem {
  foodId: number;
  userId: number;
  foodName: string;
  foodImageUrl: string;
  isSoldOut: number;
  expirationDate: string;
  quantity: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
}
interface Deal {
  dealId: number;
  requesterId: number;
  foodId: number;
  isComplete: number;
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

  const myUser = useRecoilValue(myUserState);
  const [userDeals, setUserDeals] = useState<Deal[]>([]);
  const [showAlreadyTradedPopup, setShowAlreadyTradedPopup] = useState(false);
  const userId = myUser?.userId;

  useEffect(() => {
    if (userId) {
      axios
        .get(`${serverHostName}/deals/requester/${userId}`)
        .then((response) => {
          setUserDeals(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user deals:", error);
        });
    }
  }, [userId]);

  useEffect(() => {
    if (id) {
      axios
        .get<FoodItem>(`${serverHostName}/foods/soro/${id}`)
        .then((response) => {
          setFoodItem(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the food item:", error);
        });
    }
    // toast.success("The transaction contact has been completed."); // TODO: remove
  }, [id]);

  const isDealInProgress = useMemo(() => {
    if (foodItem)
      return userDeals.some((deal) => deal.foodId === foodItem.foodId);
    return false;
  }, [userDeals, foodItem]);

  if (!foodItem) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header title="Food Details" className="z-50" />
        <div className="flex-grow overflow-y-auto p-4 flex items-center justify-center">
          <div>Loading or Item not found...</div>
        </div>

        <FooterBar />
      </div>
    );
  }

  const handleButtonClick = () => {
    const alreadyTraded = userDeals.some(
      (deal) => deal.foodId === foodItem.foodId,
    );
    if (alreadyTraded) {
      setShowAlreadyTradedPopup(true);
    } else {
      setShowModal(true);
    }
  };

  const createDealAndChat = async () => {
    console.log("foodId:", foodItem.foodId);
    console.log("userId", userId);
    // Create a new deal
    const dealResponse = await axios.post<{
      // should be fix in backend
      affectedRows: number;
      changedRows: number;
      fieldCount: number;
      insertId: number;
      message: string;
      protocol41: boolean;
      serverStatus: number;
      warningCount: number;
    }>(`${serverHostName}/deals`, {
      requesterId: userId,
      foodId: foodItem.foodId,
      isComplete: false,
    });

    const dealId = dealResponse.data.insertId;

    // Create a new chat message
    await axios.post(`${serverHostName}/chats`, {
      dealId: dealId,
      senderId: userId,
      content: initialMessage,
    });
  };

  const handleSubmit = async () => {
    setShowModal(false);
    // setShowPurchasePopup(true);
    // Create deal and chat
    await createDealAndChat();
    // workaround for show toast
    if (userId) {
      axios
        .get(`${serverHostName}/deals/requester/${userId}`)
        .then((response) => {
          setUserDeals(response.data);
          toast.success("The transaction contact has been completed.");
        })
        .catch((error) => {
          console.error("Error fetching user deals:", error);
        });
    }
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
                : `${serverHostName}/images/foods/${foodItem.foodImageUrl}`
            }
            alt={foodItem.foodName}
            className="w-full h-full object-cover rounded-md"
          />
          <h1 className="text-2xl font-bold py-2 px-1">{foodItem.foodName}</h1>
          <div className="text-base items-center flex justify-center">
            <div className="flex items-center m-1">
              <div className="avatar px-1">
                <div className="w-6 rounded-full">
                  <img src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/117.jpg" />
                </div>
              </div>
              {foodItem.userName}
            </div>
          </div>
          <p className="text-lg">
            Expiration Date: {formatDate(foodItem.expirationDate)}
          </p>
          <p className="text-lg">Quantity: {foodItem.quantity}</p>

          <div className="mt-6">
            {/* <h2 className="text-xl font-semibold">Description:</h2> */}
            <p className="text-lg">{foodItem.description}</p>
          </div>
        </div>
      </div>
      {isDealInProgress ? (
        <div className="sticky flex bottom-14 mx-1 mb-1 mt-2 justify-center">
          <div className="badge badge-lg m-2 badge-accent">
            Deal in progress
          </div>
        </div>
      ) : (
        <div className="sticky flex bottom-14 mx-1 mb-1 mt-2 justify-center">
          <button
            className="btn btn-success shadow w-full sticky bottom-14 p-4 mt-4"
            onClick={handleButtonClick}
          >
            I want this!
          </button>
        </div>
      )}

      <FooterBar />

      {/* Initial Message Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-100">
          <div className="modal-box w-full">
            <h2>Initial Message</h2>
            <input
              type="text"
              value={initialMessage}
              onChange={(e) => setInitialMessage(e.target.value)}
              className="input input-bordered border w-full"
            />
            <div className="modal-action flex justify-between">
              <button
                className="btn btn-error shadow"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-success shadow" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Purchase Completed Popup */}
      {showPurchasePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-100">
          <div className="modal-box w-full">
            <h2 className="text-lg">
              The transaction contact for food "
              <span className="font-bold">{foodItem.foodName}</span>" has been
              completed.
            </h2>
            <div className="modal-action">
              <button
                className="btn btn-accent shadow"
                onClick={closePurchasePopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* No need? */}
      {showAlreadyTradedPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-100">
          <div className="bg-white p-4 rounded">
            <h2>Trade Not Possible</h2>
            <p>
              This food item has already been traded and cannot be traded again.
            </p>
            <button
              className="btn btn-accent shadow p-2 rounded"
              onClick={() => setShowAlreadyTradedPopup(false)}
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
