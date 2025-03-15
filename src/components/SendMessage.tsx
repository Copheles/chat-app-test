import { IoSend } from "react-icons/io5";
import { useChat } from "../context/ChatContext";


interface SendMessageProps {
  message: { message: string; sender: string };
  setMessage: (message: { message: string; sender: string }) => void;
  handleSend: () => void;
}

const SendMessage = ({ message, setMessage, handleSend }: SendMessageProps) => {
  const { displayName } = useChat();
  const isButtonDisabled = !displayName;

  return (
    <div className="w-full px-2 gap-2 flex items-center py-1">
      <input
        type="text"
        value={message.message}
        onChange={(e) => setMessage({ ...message, message: e.target.value })}
        onKeyDown={(e) => {
          if (e.key === "Enter" && displayName) handleSend();
        }}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-300 transition-all"
        placeholder="Type a message..."
      />
      <button
        onClick={handleSend}
        disabled={isButtonDisabled}
        className={`flex items-center justify-center p-2 rounded-full transition-colors ${
          isButtonDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-purple-500 hover:bg-purple-600"
        }`}
      >
        <IoSend size={20} className="text-white" />
      </button>
    </div>
  );
};

export default SendMessage;
