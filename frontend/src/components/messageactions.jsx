import { FiCopy } from "react-icons/fi";

function MessageActions({ text }) {
  function copyMessage() {
    navigator.clipboard.writeText(text);
  }

  return (
    <button
      onClick={copyMessage}
      className="text-gray-400 hover:text-blue-600 transition"
      title="Copy"
    >
      <FiCopy size={16} />
    </button>
  );
}

export default MessageActions;