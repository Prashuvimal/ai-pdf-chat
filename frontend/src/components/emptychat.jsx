import { FaRobot } from "react-icons/fa";

function EmptyChat() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">

      <FaRobot
        size={60}
        className="text-blue-600 mb-4"
      />

      <h2 className="text-2xl font-bold mb-2">
        Welcome to AI PDF Chat
      </h2>

      <p className="text-gray-500 max-w-md">
        Upload a PDF and ask questions about it.
        The AI will answer using the document.
      </p>

    </div>
  );
}

export default EmptyChat;