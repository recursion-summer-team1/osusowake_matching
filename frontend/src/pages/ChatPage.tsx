import React, { useState, useEffect, useMemo } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import { useRecoilValue } from "recoil";
import { myUserState } from "../utils/myUserState";
import FooterBar from "../components/FooterBar";
import Header from "../components/Header";

interface ChatItem {
  chatId: number;
  dealId: number;
  senderId: number;
  content: string;
  createdAt: string;
  senderAvatarUrl?: string;
  receiverAvatarUrl?: string;
}

const ChatPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as {
    isOwner?: boolean;
    userName?: string;
    foodName?: string;
    receiverId?: number;
  };
  const isOwner = state?.isOwner;
  const userName = state?.userName;
  const foodName = state?.foodName;
  const receiverId = state?.receiverId;
  const { dealId } = useParams<{ dealId: string }>();
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [message, setMessage] = useState<string>("");
  const [senderAvatarUrl, setSenderAvatarUrl] = useState<string>("");
  const [receiverAvatarUrl, setReceiverAvatarUrl] = useState<string>("");

  const myUser = useRecoilValue(myUserState);
  const senderId = Number(myUser?.userId); //ログイン機能実装時に変更

  const socket = useMemo(() => io("http://localhost:3000", {
    transports: ["websocket"],
  }), []);

  const handleTransactionCompletion = async () => {
    try {
      await axios.put(`http://localhost:3000/deals/${dealId}`);
      navigate("/deal-list");
    } catch (error) {
      console.error("There was an error updating the deal data:", error);
    }
  };

  useEffect(() => {
    const fetchAvatarUrl = async (userId: number) => {
      try {
          const response = await axios.get(
            `http://localhost:3000/users/${userId}`,
          );
          return response.data.avatarUrl;
      } catch (error) {
        console.error("Error fetching the user data:", error);
      }
    };

    if (senderId) {
      fetchAvatarUrl(senderId).then((avatarUrl) => setSenderAvatarUrl(avatarUrl));
    }
    if (receiverId){
      fetchAvatarUrl(receiverId).then((avatarUrl) => setReceiverAvatarUrl(avatarUrl));
    }

    axios
      .get(`http://localhost:3000/chats/${dealId}`)
      .then((response) => {
        setChats(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the chat data:", error);
      });

      socket.on('new-message', (newMessage: ChatItem) => {
        console.log("newMessage:", newMessage);
        setChats((prevChats) => [...prevChats, newMessage]);
      });

      socket.on('message-error', (errorData) => {
        console.error('Error from server:', errorData);
      });
      return () => {
        socket.off('new-message');
        socket.off('message-error');
      }
  }, [senderId, receiverId, dealId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message) return;

    socket.emit('send-message', {
      dealId: Number(dealId),
      senderId: senderId,
      content: message,
    });
    setMessage("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top */}
      <Header title={`${userName} | ${foodName}`} className="z-50" />
      {isOwner && (
        <button
          type="button"
          className="btn btn-success shadow w-[full-2] sticky top-12 m-1 z-50"
          onClick={handleTransactionCompletion}
        >
          Transaction Completion
        </button>
      )}
      <div className="flex-grow overflow-y-auto">
        {/* Chat messages */}
        {chats.map((chat, i) => {
          const originalDate = new Date(chat.createdAt);
          const localDate = new Date(originalDate.getTime() - (9 * 60 * 60 * 1000));
          const formattedDate = localDate.toLocaleString('ja-JP');

          return chat.senderId !== senderId ? (
            //receiver chat
            <div className="chat chat-start px-1" key={i}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img src={ receiverAvatarUrl.startsWith("http") ? receiverAvatarUrl : `http://localhost:3000/images/avatars/${receiverAvatarUrl}` } />
                </div>
              </div>
              <div className="chat-header">
                <time className="text-xa opacity-50">
                  {formattedDate}
                </time>
              </div>
              <div className="chat-bubble chat-bubble-primary">
                {chat.content}
              </div>
            </div>
          ) : (
            // sender chat
            <div className="chat chat-end px-1" key={i}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img src={ senderAvatarUrl.startsWith("http") ? senderAvatarUrl : `http://localhost:3000/images/avatars/${senderAvatarUrl}` } />
                </div>
              </div>
              <div className="chat-header">
                <time className="text-xs opacity-50">
                  {formattedDate}
                </time>
              </div>
              <div className="chat-bubble chat-bubble-secondary prose">
                {chat.content}
              </div>
            </div>
          );
          })}
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
        <button
          type="submit"
          className="btn bg-success text-base-100 shadow"
          // onClick={handleSubmit}
        >
          <span className="i-fluent-send-32-filled" />
        </button>
      </form>
      {/* Footer */}
      <FooterBar />
    </div>
  );
};

export default ChatPage;
