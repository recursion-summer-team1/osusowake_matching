import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { myUserState } from "../utils/myUserState";
import FooterBar from "../components/FooterBar";
import Header from "../components/Header";
import { serverHostName } from "../utils/serverHostName";
import toast from "react-hot-toast";

interface ChatItem {
  chatId: number;
  dealId: number;
  senderId: number;
  content: string;
  createdAt: string;
}

const ChatPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as {
    isOwner?: boolean;
    userName?: string;
    foodName?: string;
  };
  const isOwner = state?.isOwner;
  const userName = state?.userName;
  const foodName = state?.foodName;
  const { dealId } = useParams<{ dealId: string }>();
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [message, setMessage] = useState<string>("");

  const myUser = useRecoilValue(myUserState);
  const senderId = Number(myUser?.userId); //ログイン機能実装時に変更

  const handleTransactionCompletion = async () => {
    try {
      await axios.put(`${serverHostName}/deals/${dealId}`);
      navigate("/deal-list");
      toast.success("The food deal has been completed.");
    } catch (error) {
      console.error("There was an error updating the deal data:", error);
    }
  };

  useEffect(() => {
    axios
      .get(`${serverHostName}/chats/${dealId}`)
      .then((response) => {
        setChats(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the chat data:", error);
      });
  }, [dealId]);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight); // Scroll to the bottom when the chat is updated
  }, [chats]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message) return;

    try {
      await axios.post(`${serverHostName}/chats`, {
        dealId: parseInt(dealId ? dealId : "0"),
        senderId: senderId,
        content: message,
      });

      setMessage("");
      const response = await axios.get(`${serverHostName}/chats/${dealId}`);
      setChats(response.data);
    } catch (error) {
      console.error("There was an error posting the chat data:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top */}
      <Header title={`${userName} | ${foodName}`} className="z-50" />
      {isOwner && (
        <button
          type="button"
          className="btn btn-success shadow-md sticky top-[4.5rem] m-1 z-50 bg-opacity-95"
          onClick={handleTransactionCompletion}
        >
          Transaction Completion
        </button>
      )}
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
              <div className="chat-bubble chat-bubble-secondary prose break-words">
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
              <div className="chat-bubble chat-bubble-primary prose break-words">
                {chat.content}
              </div>
            </div>
          ),
        )}
      </div>
      {/* Input form */}
      <form
        className="sticky flex bottom-14 mx-1 mb-1 mt-2 justify-center"
        onSubmit={handleSubmit}
      >
        <div className="join w-full shadow">
          <input
            type="text"
            placeholder="Type your message..."
            className="join-item input input-bordered input-md input-primary w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="join-item btn bg-primary text-base-100 border-primary"
            // onClick={handleSubmit}
          >
            <span className="i-fluent-send-32-filled text-base" />
          </button>
        </div>
      </form>
      {/* Footer */}
      <FooterBar />
    </div>
  );
};

export default ChatPage;
