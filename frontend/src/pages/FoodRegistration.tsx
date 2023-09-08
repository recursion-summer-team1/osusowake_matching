import React, { useRef, useState } from "react";
import Header from "../components/Header";
import FooterBar from "../components/FooterBar";
import axios from "axios";
import { serverHostName } from "../utils/serverHostName";
import { toast } from "react-hot-toast";

const FoodRegistration: React.FC = () => {
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

  const foodNameRef = useRef<HTMLInputElement | null>(null);
  const foodImageRef = useRef<HTMLInputElement | null>(null);
  const expirationDateRef = useRef<HTMLInputElement | null>(null);
  const quantityRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  // useEffect(() => {
  //   foodNameRef.current?.focus();
  // }, []);

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
      .post(`${serverHostName}/foods`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Food item registered:", response.data);
        setShowPopup(false);
        [
          foodNameRef,
          foodImageRef,
          expirationDateRef,
          quantityRef,
          descriptionRef,
        ].forEach((ref) => {
          if (ref.current) {
            ref.current.value = "";
          }
        });
        toast.success("The food has been registered.");
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
          <div className="form-control">
            <label className="label" htmlFor="foodName">
              <span className="label-text">
                Food Name{" "}
                <span className="badge badge-sm text-opacity-70">Required</span>
              </span>
            </label>
            <input
              required
              ref={foodNameRef}
              type="text"
              id="foodName"
              name="foodName"
              className="input input-bordered input-sm w-full bg-white"
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="foodImage">
              <span className="label-text">
                Food Image{" "}
                <span className="badge badge-sm text-opacity-70">Required</span>
              </span>
            </label>
            <input
              required
              ref={foodImageRef}
              className="file-input file-input-bordered w-full file-input-primary"
              type="file"
              id="foodImage"
              name="foodImage"
              onChange={handleImageUpload}
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="expirationDate">
              <span className="label-text">
                Expiration Date{" "}
                <span className="badge badge-sm text-opacity-70">Required</span>
              </span>
            </label>
            <input
              required
              ref={expirationDateRef}
              type="date"
              id="expirationDate"
              name="expirationDate"
              className="input input-bordered input-sm w-full"
              onChange={handleChange}
              style={{
                textAlign: "center",
                width: "100%",
                border: "1px solid #ccc",
                background: "white",
              }}
            />
          </div>
          <div className="form-control w-full">
            <label className="label" htmlFor="quantity">
              <span className="label-text">
                Quantity{" "}
                <span className="badge badge-sm text-opacity-70">Required</span>
              </span>
            </label>
            <input
              required
              ref={quantityRef}
              type="text"
              id="quantity"
              name="quantity"
              className="input input-bordered input-sm w-full"
              onChange={handleChange}
              style={{
                border: "1px solid #ccc",
                background: "white",
              }}
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="description">
              <span className="label-text">Description</span>
            </label>
            <textarea
              ref={descriptionRef}
              id="description"
              name="description"
              className="input input-bordered input-md w-full h-20 rounded-2xl"
              onChange={handleChange}
              style={{
                border: "1px solid #ccc",
                background: "white",
              }}
            ></textarea>
          </div>
          <div className="flex items-center justify-center">
            <button className="btn btn-success shadow w-full m-1 mt-5">
              Register Food
            </button>
          </div>
        </form>
      </div>
      <FooterBar />

      {/* Popup for confirmation */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="modal-box w-full">
            <h2 className="text-lg">
              Are you sure you want to register this food "
              <span className="font-bold">{formData.foodName}</span>"?
            </h2>
            <div className="modal-action flex justify-between">
              <button
                className="btn btn-error shadow"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-success shadow"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodRegistration;
