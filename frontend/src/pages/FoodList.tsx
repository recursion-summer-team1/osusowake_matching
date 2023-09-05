import React from 'react';
import FooterBar from '../components/FooterBar';

// Dummy data for demonstration
const foodItems = [
  { id: 1, image: 'https://t3.ftcdn.net/jpg/01/44/72/68/360_F_144726846_a6aI8wZXCKV7lOz0bsg3Enax7PGy1KSR.jpg', owner: 'a' },
  { id: 2, image: 'https://t3.ftcdn.net/jpg/01/44/72/68/360_F_144726846_a6aI8wZXCKV7lOz0bsg3Enax7PGy1KSR.jpg', owner: 'b' },
  { id: 3, image: 'https://t3.ftcdn.net/jpg/01/44/72/68/360_F_144726846_a6aI8wZXCKV7lOz0bsg3Enax7PGy1KSR.jpg', owner: 'c' },
  { id: 4, image: 'https://t3.ftcdn.net/jpg/01/44/72/68/360_F_144726846_a6aI8wZXCKV7lOz0bsg3Enax7PGy1KSR.jpg', owner: 'd' },
  { id: 5, image: 'https://t3.ftcdn.net/jpg/01/44/72/68/360_F_144726846_a6aI8wZXCKV7lOz0bsg3Enax7PGy1KSR.jpg', owner: 'e' },
  { id: 6, image: 'https://t3.ftcdn.net/jpg/01/44/72/68/360_F_144726846_a6aI8wZXCKV7lOz0bsg3Enax7PGy1KSR.jpg', owner: 'f' },
  { id: 7, image: 'https://t3.ftcdn.net/jpg/01/44/72/68/360_F_144726846_a6aI8wZXCKV7lOz0bsg3Enax7PGy1KSR.jpg', owner: 'g' },
  { id: 8, image: 'https://t3.ftcdn.net/jpg/01/44/72/68/360_F_144726846_a6aI8wZXCKV7lOz0bsg3Enax7PGy1KSR.jpg', owner: 'h' },
  { id: 9, image: 'https://t3.ftcdn.net/jpg/01/44/72/68/360_F_144726846_a6aI8wZXCKV7lOz0bsg3Enax7PGy1KSR.jpg', owner: 'i' },
  { id: 10, image: 'https://t3.ftcdn.net/jpg/01/44/72/68/360_F_144726846_a6aI8wZXCKV7lOz0bsg3Enax7PGy1KSR.jpg', owner: 'j' },
  { id: 11, image: 'https://t3.ftcdn.net/jpg/01/44/72/68/360_F_144726846_a6aI8wZXCKV7lOz0bsg3Enax7PGy1KSR.jpg', owner: 'k' },
  { id: 12, image: 'https://t3.ftcdn.net/jpg/01/44/72/68/360_F_144726846_a6aI8wZXCKV7lOz0bsg3Enax7PGy1KSR.jpg', owner: 'l' },
  { id: 13, image: 'https://t3.ftcdn.net/jpg/01/44/72/68/360_F_144726846_a6aI8wZXCKV7lOz0bsg3Enax7PGy1KSR.jpg', owner: 'mmm' },
];

const FoodList: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top */}
      <div className="bg-blue-500 text-white p-4">
        <h1 className="text-center">Food List</h1>
      </div>

      {/* Scrollable Food Items Grid */}
      <div className="flex-grow overflow-y-auto">
        <div className="grid grid-cols-2 gap-4 p-4">
          {foodItems.map((item) => (
            <div key={item.id} className="relative">
              <img src={item.image} alt={item.owner} className="w-full h-full object-cover" />
              <span className="absolute bottom-2 right-2 bg-white bg-opacity-50 text-black rounded">
                {item.owner}
              </span>
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
