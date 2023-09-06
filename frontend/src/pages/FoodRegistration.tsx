import React, { useState } from 'react';
import Header from '../components/Header';
import FooterBar from '../components/FooterBar';
import { useNavigate } from "react-router-dom";

const FoodRegistration: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    foodId: 0,
    userId: 0,
    foodName: '',
    foodImageUrl: '',
    isSoldout: false,
    expirationDate: '',
    quantity: 0,
    unit: '',
    description: '',
    createdAt: '',
    updatedAt: ''
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handleConfirm = () => {
    console.log('Form data submitted:', formData);
    setShowPopup(false);
    navigate("/food-list");
  };

    // Function to handle image upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({
            ...formData,
            foodImageUrl: reader.result as string,
          });
        };
        reader.readAsDataURL(file);
      }
    };

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Food Registration" />
      <div className="p-4 flex items-center justify-center">
        <form onSubmit={handleSubmit} style={{ maxWidth: '100%', textAlign: 'center' }}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="foodName" style={{ display: 'block', marginBottom: '5px' }}>Food Name</label>
            <input required type="text" id="foodName" name="foodName" onChange={handleChange} style={{textAlign:"center",width: '100%',border: "1px solid #ccc",background: "white",}}/>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="foodImageUrl" style={{ display: 'block', marginBottom: '5px' }}>Food Image</label>
            <input required type="file" id="foodImageUrl" name="foodImageUrl" onChange={handleImageUpload} />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="expirationDate" style={{ display: 'block', marginBottom: '5px' }}>Expiration Date</label>
            <input required type="date" id="expirationDate" name="expirationDate" onChange={handleChange} style={{textAlign:"center", width: '100%',border: "1px solid #ccc",background: "white",}}/>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="quantity" style={{ display: 'block', marginBottom: '5px' }}>Quantity</label>
            <input required type="number" id="quantity" name="quantity" onChange={handleChange} style={{textAlign:"center",width: '100%',border: "1px solid #ccc",background: "white",}}/>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="unit" style={{ display: 'block', marginBottom: '5px' }}>Unit</label>
            <input required type="text" id="unit" name="unit" onChange={handleChange} style={{textAlign:"center",width: '100%',border: "1px solid #ccc",background: "white",}}/>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="description" style={{ display: 'block', marginBottom: '5px' }}>Description</label>
            <textarea id="description" name="description" onChange={handleChange} style={{textAlign:"center",width: '100%',border: "1px solid #ccc",background: "white",}}></textarea>
          </div>
          <button className="bg-blue-500 text-white p-2 rounded" type="submit">Register Food</button>
        </form>
      </div>
      <FooterBar />

      {/* Popup for confirmation */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded">
            <h2>Register "{formData.foodName}"</h2>
            <p>Are you sure you want to register this food item?</p>
            <button className="bg-green-500 text-white p-2 rounded mt-4" onClick={handleConfirm}>
              Confirm
            </button>
            <button className="bg-red-500 text-white p-2 rounded mt-4 ml-4" onClick={() => setShowPopup(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodRegistration;
