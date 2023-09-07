import React, { useState } from "react";
import Header from "../components/Header";
import FooterBar from "../components/FooterBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FoodRegistration: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<{
    userId: string;
    foodName: string;
    foodImage: File | null;
    isSoldOut: string;
    expirationDate: string;
    quantity: string;
    description: string;
  }>({
    userId: "1",
    foodName: "",
    foodImage: null,
    isSoldOut: "",
    expirationDate: "",
    quantity: "",
    description: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handleConfirm = () => {
    const data = new FormData();

    data.append("userId", "1");
    data.append("foodName", formData.foodName);
    if (formData.foodImage) {
      data.append("foodImage", formData.foodImage);
    }
    data.append("isSoldOut", "");
    data.append("expirationDate", formData.expirationDate);
    data.append("quantity", formData.quantity);
    if (formData.description) {
      data.append("description", formData.description);
    }

    // Send POST request to /foods API
    axios
      .post("http://localhost:3000/foods", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Food item registered:", response.data);
        setShowPopup(false);
        navigate("/food-list");
      })
      .catch((error) => {
        console.error("There was an error registering the food item:", error);
      });
  };

  // Function to handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          foodImage: file,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Food Registration" />
      <div className="p-4 flex-grow items-center justify-center overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="foodName">
              <span className="label-text">Food Name</span>
            </label>
            <input
              required
              type="text"
              id="foodName"
              name="foodName"
              className="input input-bordered input-sm w-full max-w-xs"
              onChange={handleChange}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="foodImage">
              <span className="label-text">Food Image</span>
            </label>
            <input
              required
              className="file-input file-input-bordered w-full max-w-xs"
              type="file"
              id="foodImage"
              name="foodImage"
              onChange={handleImageUpload}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="expirationDate">
              <span className="label-text">Expiration Date</span>
            </label>
            <input
              required
              type="date"
              id="expirationDate"
              name="expirationDate"
              className="input input-bordered input-sm w-full max-w-xs"
              onChange={handleChange}
              style={{
                textAlign: "center",
                width: "100%",
                border: "1px solid #ccc",
                background: "white",
              }}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="quantity">
              <span className="label-text">Quantity</span>
            </label>
            <input
              required
              type="text"
              id="quantity"
              name="quantity"
              className="input input-bordered input-sm w-full max-w-xs"
              onChange={handleChange}
              style={{
                textAlign: "center",
                width: "100%",
                border: "1px solid #ccc",
                background: "white",
              }}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label
              className="label"
              htmlFor="description"
            >
              <span className="label-text">Description</span>
            </label>
            <textarea
              id="description"
              name="description"
              className="input input-bordered input-md w-full max-w-xs"
              onChange={handleChange}
              style={{
                textAlign: "center",
                width: "100%",
                border: "1px solid #ccc",
                background: "white",
              }}
            ></textarea>
          </div>
          <div className="flex items-center justify-center">
            <button className="btn btn-success shadow w-[full-2] sticky top-12 m-1 z-50">
              Register Food
            </button>
          </div>
        </form>
      </div>
      <FooterBar />

      {/* Popup for confirmation */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded">
            <h2>Register "{formData.foodName}"</h2>
            <p>Are you sure you want to register this food item?</p>
            <button
              className="btn btn-error shadow w-[full-2] sticky top-12  p-2 rounded mt-4 ml-4"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-success shadow w-[full-2] sticky top-12  p-2 rounded mt-4 ml-4"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodRegistration;
