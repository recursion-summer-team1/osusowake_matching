import React, { useState, useEffect } from "react";
import axios from "axios";
import FooterBar from "../components/FooterBar";
import Header from "../components/Header";
import { Link } from "react-router-dom";

interface Food {
  foodId: number;
  userId: number;
  foodName: string;
  foodImageUrl: string;
  isSoldOut: boolean;
  expirationDate: Date;
  quantity: number;
  unit: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  requesterName?: string;
  ownerName?: string;
  userName: string;
  dealId: number;
}
interface DealData {
  dealId: number;
  foodId: number;
  requesterId: number;
}

const DealPage = () => {
  const [myFoodsToShare, setMyFoodsToShare] = useState<Food[]>([]);
  const [foodsToShareByOthers, setFoodsToShareByOthers] = useState<Food[]>([]);
  // const userId = 1; // Assuming userId is 1

  useEffect(() => {
    const fetchUserName = async (userId: number) => {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      return response.data.userName;
    };

    const fetchDealsAndFoods = async (
      url: string,
      setFoodsState: React.Dispatch<React.SetStateAction<Food[]>>,
      isOwner: boolean = false,
    ) => {
      try {
        const dealResponse = await axios.get(url);
        const dealData: DealData[] = dealResponse.data.map(
          (deal: { dealId: number; foodId: number; requesterId: number }) => ({
            dealId: deal.dealId,
            foodId: deal.foodId,
            requesterId: deal.requesterId,
          }),
        );
        const foodResponses = await Promise.all(
          dealData.map((deal: DealData) =>
            axios.get(`http://localhost:3000/foods/${deal.foodId}`),
          ),
        );
        const foods = foodResponses.map((res, index) => ({
          ...res.data,
          dealId: dealData[index].dealId,
        }));
        for (const [index, food] of foods.entries()) {
          if (isOwner) {
            food.userName = await fetchUserName(dealData[index].requesterId);
          } else {
            food.userName = await fetchUserName(food.userId);
          }
        }
        setFoodsState(foods);
      } catch (error) {
        console.error("Error fetching deals or foods:", error);
      }
    };

    fetchDealsAndFoods(
      `http://localhost:3000/deals/requester/2`,
      setFoodsToShareByOthers,
    );
    fetchDealsAndFoods(
      `http://localhost:3000/deals/owner/2`,
      setMyFoodsToShare,
      true,
    );
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="List of Deals" className="z-50" />
      <div className="flex-grow overflow-y-auto p-4 flex flex-col justify-center items-center">
        <h2 className="text-lg text-left">My foods to share</h2>
        {myFoodsToShare.map((food, i) => (
          <div
            className="card card-side flex-grow h-48 w-full bg-base-200 shadow-sm my-1"
            key={i}
            style={{ display: "flex", flexDirection: "row", height: "100px" }}
          >
            <figure
              className="flex-grow"
              style={{ flex: "1", objectFit: "cover" }}
            >
              <img
                src={food.foodImageUrl}
                alt={food.foodName}
                style={{ width: "100%", height: "100px", objectFit: "cover" }}
              />
            </figure>
            <div
              className="card-body flex-grow"
              style={{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h2 className="card-title text-sm">{food.foodName}</h2>
              <p className="text-sm">Requester: {food.userName}</p>
            </div>
            <div
              className="card-actions flex-grow"
              style={{
                flex: "1",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link to={`/chat/${food.dealId}`} className="btn btn-primary">
                Chat
              </Link>
            </div>
          </div>
        ))}

        <h2 className="text-lg text-left pt-2">Foods to share by others</h2>
        {foodsToShareByOthers.map((food, i) => (
          <div
            className="card card-side flex-grow h-48 w-full bg-base-200 shadow-sm my-1"
            key={i}
            style={{ display: "flex", flexDirection: "row", height: "100px" }}
          >
            <figure
              className="flex-grow"
              style={{ flex: "1", objectFit: "cover" }}
            >
              <img
                src={food.foodImageUrl}
                alt={food.foodName}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </figure>
            <div
              className="card-body flex-grow"
              style={{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h2 className="card-title text-sm">{food.foodName}</h2>
              <p className="text-sm">
                Owner: <br></br>
                {food.userName}
              </p>
            </div>
            <div
              className="card-actions flex-grow"
              style={{
                flex: "1",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link to={`/chat/${food.dealId}`} className="btn btn-primary">
                Chat
              </Link>
            </div>
          </div>
        ))}
      </div>

      <FooterBar />
    </div>
  );
};

export default DealPage;
