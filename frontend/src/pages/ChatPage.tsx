// import { useState } from "react";

import FooterBar from "../components/FooterBar";
import Header from "../components/Header";

const ChatPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top */}
      <Header title="Item Name | User name" className="z-50" />
      <div className="flex-grow overflow-y-auto mt-14 mb-24">
        {new Array(4).fill(0).map((_, i) => (
          <div className="chat chat-start m-1" key={i}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="https://images.unsplash.com/photo-1635324944940-0c0a9c8f9bf1?w=200" />
              </div>
            </div>
            <div className="chat-bubble chat-bubble-primary">
              It was said that you would, destroy the Sith, not join them.
            </div>
          </div>
        ))}
        {new Array(5).fill(0).map((_, i) => (
          <div className="chat chat-end m-1" key={i}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="https://images.unsplash.com/photo-1635324944940-0c0a9c8f9bf1?w=200" />
              </div>
            </div>
            <div className="chat-bubble chat-bubble-secondary">
              It was said that you would, destroy the Sith, not join them.
            </div>
          </div>
        ))}
      </div>
      <form className="flex bottom-12 fixed w-full mx-1">
        <input
          type="text"
          placeholder="Type your message..."
          className="input input-bordered input-md input-primary w-full max-w-xs"
          // value={message}
          // onChange={handleChange}
        />
        <button
          type="submit"
          className="btn bg-blue-500 text-white hover:bg-blue-600"
          // onClick={handleSubmit}
        >
          <span className="i-formkit-submit" />
        </button>
      </form>
      <button
        type="submit"
        className="btn bg-blue-500 text-white hover:bg-blue-600 w-full fixed top-12"
        // onClick={handleSubmit}
      >
        Transaction Completion
      </button>
      {/* Footer */}
      <FooterBar />
    </div>
  );
};

export default ChatPage;
