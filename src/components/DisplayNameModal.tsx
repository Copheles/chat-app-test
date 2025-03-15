import { useState } from "react";
import { IoPerson } from "react-icons/io5";

interface DisplayNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

const DisplayNameModal = ({
  isOpen,
  onClose,
  onSave,
}: DisplayNameModalProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSave = () => {
    if (inputValue.trim()) {
      onSave(inputValue);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl transform transition-all duration-300 ease-in-out">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <IoPerson size={32} className="text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to Live Chat
          </h2>
          <p className="text-gray-500">
            Please enter your display name to continue.
          </p>
        </div>

        <div className="mt-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="Enter your name..."
          />
        </div>

        <div className="mt-6">
          <button
            onClick={handleSave}
            disabled={inputValue.length === 0}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Go to Chat
          </button>
          <button
            onClick={onClose}
            className="w-full mt-3 text-gray-500 hover:text-gray-700 font-semibold py-2 rounded-lg transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplayNameModal;
