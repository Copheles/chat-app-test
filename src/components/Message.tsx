import Avatar from "./Avatar";
import { IMessage } from "../context/ChatContext";

interface Props {
  message: IMessage;
}

const Message = ({ message }: Props) => {
  return (
    <div className="flex gap-2 items-start my-1">
      <Avatar displayName={message.sender || "Unknown"} />
      <div className="flex-1 min-w-0">
        <div className="bg-gray-50 px-2 pb-2 rounded-lg">
          <span className="text-gray-500 font-medium">{message.sender}</span>
          <p className="text-gray-700 mt-1 whitespace-normal break-words">
            {message.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;
