import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FooterBar from "../components/FooterBar";
import Header from "../components/Header";

interface ChatItem {
  chatId: number;
  dealId: number;
  senderId: number;
  content: string;
  createdAt: string;
}

const ChatPage: React.FC = () => {
  const { dealId } = useParams<{ dealId: string }>();
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [message, setMessage] = useState<string>("");

  const senderId = 1; //ログイン機能実装時に変更

  useEffect(() => {
    axios
      .get(`http://localhost:3000/chats/${dealId}`)
      .then((response) => {
        setChats(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the chat data:", error);
      });
  }, [dealId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message) return;

    try {
      await axios.post("http://localhost:3000/chats", {
        dealId: parseInt(dealId ? dealId : "0"),
        senderId: senderId,
        content: message,
      });

      setMessage("");
      const response = await axios.get(`http://localhost:3000/chats/${dealId}`);
      setChats(response.data);
    } catch (error) {
      console.error("There was an error posting the chat data:", error);
    }
  };

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
        {/* Chat messages */}
        {chats.map((chat, i) =>
          chat.senderId !== senderId ? (
            //Sender (self) chat
            <div className="chat chat-start px-1" key={i}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img src="https://images.unsplash.com/photo-1635324944940-0c0a9c8f9bf1?w=200" />
                </div>
              </div>
              <div className="chat-header">
                <time className="text-xa opacity-50">
                  {new Date(chat.createdAt).toLocaleString()}
                </time>
              </div>
              <div className="chat-bubble chat-bubble-primary">
                {chat.content}
              </div>
            </div>
          ) : (
            // Receiver (other) chat
            <div className="chat chat-end px-1" key={i}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img src="https://images.unsplash.com/photo-1635324944940-0c0a9c8f9bf1?w=200" />
                </div>
              </div>
              <div className="chat-header">
                <time className="text-xs opacity-50">
                  {new Date(chat.createdAt).toLocaleString()}
                </time>
              </div>
              <div className="chat-bubble chat-bubble-secondary">
                {chat.content}
              </div>
            </div>
          ),
        )}
      </div>
      {/* Input form */}
      <form
        className="sticky flex bottom-14 mx-1 w-[full-2] mb-1 mt-2 justify-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Type your message..."
          className="input input-bordered input-md input-primary w-full mx-1 shadow"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="btn bg-success text-base-100 shadow">
          <span className="i-formkit-submit" />
        </button>
      </form>
      {/* Footer */}
      <FooterBar />
    </div>
  );
};

export default ChatPage;
