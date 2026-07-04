import { FaRobot } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

function Avatar({ sender }) {
  const isUser = sender === "user";

  return (
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center ${
        isUser
          ? "bg-blue-600 text-white"
          : "bg-gray-200 text-gray-700"
      }`}
    >
      {isUser ? <FaUser /> : <FaRobot />}
    </div>
  );
}

export default Avatar;