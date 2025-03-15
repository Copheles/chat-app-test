import { useState } from "react";
import DisplayNameModal from "./DisplayNameModal";
import { useChat } from "../context/ChatContext";

const Header = () => {
  const { displayName, setDisplayName, onlineUsers } = useChat();
  const [isModalOpen, setIsModalOpen] = useState(!displayName);

  const handleSave = (name: string) => {
    setDisplayName(name);
    localStorage.setItem("displayName", name);
    setIsModalOpen(false);
  };

  return (
    <>
      <header className="flex justify-between items-center py-3 px-2 border-b border-gray-300 shadow-sm">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold text-gray-800">Live Chat</h3>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-sm text-gray-600">{onlineUsers} {onlineUsers === 1 ? 'online': 'onlines'}</span>
          </div>
        </div>
        {displayName && (
          <div
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {displayName[0].toUpperCase()}
            </div>
            <span className="text-gray-800 font-medium">{displayName}</span>
          </div>
        )}
      </header>
      <DisplayNameModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default Header;
