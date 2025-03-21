import Chat from "./components/Chat";
import { ChatProvider } from "./context/ChatContext";

const App = () => {
  return (
    <ChatProvider>
      <Chat />
    </ChatProvider>
  );
};

export default App;
