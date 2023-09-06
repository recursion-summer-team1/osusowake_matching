// import { useState } from "react";

import FooterBar from "../components/FooterBar";
import Header from "../components/Header";

const ChatPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top */}
      <Header title="User name | Item Name" className="z-50" />
      <button
        type="submit"
        className="btn btn-success shadow w-[full-2] sticky top-12 m-1 z-50"
        // onClick={handleSubmit}
      >
        Transaction Completion
      </button>
      <div className="flex-grow overflow-y-auto">
        {new Array(4).fill(0).map((_, i) => (
          <div className="chat chat-start px-1" key={i}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="https://images.unsplash.com/photo-1635324944940-0c0a9c8f9bf1?w=200" />
              </div>
            </div>
            <div className="chat-header">
              <time className="text-xs opacity-50">September 8th, 17:10</time>
            </div>
            <div className="chat-bubble chat-bubble-primary">
              It was said that you would, destroy the Sith, not join them.
            </div>
          </div>
        ))}
        {new Array(5).fill(0).map((_, i) => (
          <div className="chat chat-end px-1" key={i}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="https://images.unsplash.com/photo-1635324944940-0c0a9c8f9bf1?w=200" />
              </div>
            </div>
            <div className="chat-header">
              <time className="text-xs opacity-50">September 8th, 18:45</time>
            </div>
            <div className="chat-bubble chat-bubble-secondary">
              It was said that you would, destroy the Sith, not join them.
            </div>
          </div>
        ))}
      </div>
      {/* Input form */}
      <form className="sticky flex bottom-12 mx-1 w-[full-2] mb-1 mt-2 justify-center">
        <input
          type="text"
          placeholder="Type your message..."
          className="input input-bordered input-md input-primary w-full mx-1 shadow"
          // value={message}
          // onChange={handleChange}
        />
        <button
          type="submit"
          className="btn bg-success text-base-100 shadow"
          // onClick={handleSubmit}
        >
          <span className="i-formkit-submit" />
        </button>
      </form>
      {/* Footer */}
      <FooterBar />
    </div>
  );
};

export default ChatPage;
