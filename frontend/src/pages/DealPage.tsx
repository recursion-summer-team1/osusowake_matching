// import { useState } from "react";

import FooterBar from "../components/FooterBar";
import Header from "../components/Header";

const DealPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top */}
      <Header title="List of Deals" className="z-50" />

      <div className="flex-grow overflow-y-auto p-4 flex flex-col justify-center items-center">
        <h2 className="text-lg text-left">My foods to share</h2>
        {new Array(6).fill(0).map((_, i) => (
          <div
            className="card card-side flex-grow h-16 w-full bg-base-200 shadow-sm my-1"
            key={i}
          >
            <figure className="h-full w-6 flex-grow">
              <img
                src="https://t3.ftcdn.net/jpg/01/44/72/68/360_F_144726846_a6aI8wZXCKV7lOz0bsg3Enax7PGy1KSR.jpg"
                alt="food name"
              />
            </figure>
            <div className="card-body justify-center">
              <div className="flex flex-row">
                <div className="flex flex-col justify-center">
                  <h2 className="card-title text-sm">Food Name</h2>
                  <p className="text-sm">User name</p>
                </div>
              </div>
            </div>
            <div className="card-actions justify-end items-center">
              <button className="btn btn-primary">Chat</button>
            </div>
          </div>
        ))}
        <h2 className="text-lg text-left pt-2">Foods to share by others</h2>
        {new Array(5).fill(0).map((_, i) => (
          <div
            className="card card-side flex-grow h-16 w-full bg-base-200 shadow-sm my-1"
            key={i}
          >
            <figure className="h-full w-6 flex-grow">
              <img
                src="https://t3.ftcdn.net/jpg/01/44/72/68/360_F_144726846_a6aI8wZXCKV7lOz0bsg3Enax7PGy1KSR.jpg"
                alt="food name"
              />
            </figure>
            <div className="card-body justify-center">
              <div className="flex flex-row">
                <div className="flex flex-col justify-center">
                  <h2 className="card-title text-sm">Food Name</h2>
                  <p className="text-sm">Owner: User name</p>
                </div>
              </div>
            </div>
            <div className="card-actions justify-end items-center">
              <button className="btn btn-primary">Chat</button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <FooterBar />
    </div>
  );
};

export default DealPage;
