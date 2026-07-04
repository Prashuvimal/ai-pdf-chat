import Avatar from "./avatar";
import Timestamp from "./timestamp";
import MessageActions from "./messageactions";

function MessageBubble({ sender, message }) {
  const isUser = sender === "user";

  return (
    <div
      className={`flex gap-4 mb-8 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && <Avatar sender="bot" />}

      <div className="max-w-2xl">

        <div className="flex items-center gap-3 mb-2">

          <span className="font-semibold">
            {isUser ? "You" : "AI Assistant"}
          </span>

          <Timestamp />

        </div>

        <div
          className={`rounded-2xl px-5 py-4 shadow-sm ${
            isUser
              ? "bg-white dark:bg-gray-800 border dark:border-gray-700 dark:text-white"
              : "bg-blue-600 text-white"
          }`}
        >
          {message}
        </div>

        <div className="mt-2 flex justify-end">

          <MessageActions text={message} />

        </div>

      </div>

      {isUser && <Avatar sender="user" />}
    </div>
  );
}

export default MessageBubble;