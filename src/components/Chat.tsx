import React from "react";
import Header from "./Header";
import MessagesBox from "./MessagesBox";
import SendMessage from "./SendMessage";
import { useChat } from "../context/ChatContext";

const Chat = () => {
  const { displayName, sendMessage } = useChat();
  const [messageData, setMessageData] = React.useState({
    message: "",
    sender: "",
  });

  const handleSend = () => {
    if (messageData.message.trim() && displayName) {
      sendMessage(messageData.message);
      setMessageData({ message: "", sender: "" });
    }
  };

  return (
    <div className="max-w-3xl  p-2 border-[1px] border-gray-300 mx-auto bg-white rounded-lg shadow-lg">
      <Header />
      <MessagesBox />
      <SendMessage
        message={messageData}
        setMessage={setMessageData}
        handleSend={handleSend}
      />
    </div>
  );
};

export default Chat;
