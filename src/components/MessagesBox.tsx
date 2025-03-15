import { useEffect, useRef } from "react";
import Message from "./Message";
import { useChat } from "../context/ChatContext";

const MessagesBox = () => {
  const { messages } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="h-[600px] overflow-y-auto p-4 flex flex-col">
      {messages.map((message, index) => (
        <Message message={message} key={index} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesBox;
