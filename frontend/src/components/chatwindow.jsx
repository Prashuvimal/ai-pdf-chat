import MessageBubble from "./messagebubble";
import EmptyChat from "./emptychat";

function ChatWindow({ messages }) {
  if (messages.length === 0) {
    return <EmptyChat />;
  }

  return (
    <div className="flex-1 overflow-y-auto p-8">

      {messages.map((msg, index) => (
        <MessageBubble
          key={index}
          sender={msg.sender}
          message={msg.text}
        />
      ))}

    </div>
  );
}

export default ChatWindow;