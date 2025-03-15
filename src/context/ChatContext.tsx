import React, { createContext, useContext, useState, useEffect } from "react";

export interface IMessage {
  message: string;
  sender: string;
}

interface ChatContextType {
  displayName: string | null;
  setDisplayName: (name: string | null) => void;
  messages: IMessage[];
  sendMessage: (message: string) => void;
  onlineUsers: number;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [displayName, setDisplayName] = useState<string | null>(
    localStorage.getItem("displayName")
  );
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(
      import.meta.env.VITE_WEBSOCKET_API
    );

    ws.onopen = () => {
      console.log("WebSocket connection established");
      setSocket(ws);

      ws.send(
        JSON.stringify({
          type: "presence",
          action: "subscribe",
          channel: "1",
        })
      );
    };

    ws.onmessage = (event) => {
      console.log("event", event);
      const data = JSON.parse(event.data);
      console.log("Received message:", data);

      if (data.type === "message") {
        setMessages((prevMessages) => [
          ...prevMessages,
          { message: data.message, sender: data.sender },
        ]);
      }

      if (data.event === "system:member_joined" && data.data) {
        console.log("User joined:", data);
        setOnlineUsers(data.data.members.length);
      } else if (data.event === "system:member_left" && data.data) {
        console.log("User left:", data);
        setOnlineUsers((prev) => Math.max(prev - 1, 0));
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      setSocket(null);

      ws.send(
        JSON.stringify({
          type: "presence",
          action: "unsubscribe",
          channel: "1",
        })
      );

      setOnlineUsers((prev) => Math.max(prev - 1, 0));
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = (message: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const messageData = JSON.stringify({
        type: "message",
        message,
        sender: displayName || "Unknown",
      });
      socket.send(messageData);
      console.log("Message sent:", messageData);
    } else {
      console.error("WebSocket is not open");
    }
  };

  return (
    <ChatContext.Provider
      value={{
        displayName,
        setDisplayName,
        messages,
        sendMessage,
        onlineUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
