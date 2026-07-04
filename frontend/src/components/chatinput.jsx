import { useState } from "react";
import { FiSend, FiFileText } from "react-icons/fi";

function ChatInput({ sendMessage, summarizePdf }) {

  const [text, setText] = useState("");

  function handleSend() {

    if (!text.trim()) return;

    sendMessage(text);
    setText("");

  }

  return (

    <div className="bg-white dark:bg-gray-900 border-t dark:border-gray-700 p-6">

      <div className="flex items-center gap-4 w-full">

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Ask anything about your PDF..."
          className="flex-1 px-6 py-4 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl transition"
          title="Send"
        >
          <FiSend size={20} />
        </button>

        <button
          onClick={summarizePdf}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-4 rounded-xl transition flex items-center gap-2"
          title="Summarize PDF"
        >
          <FiFileText size={18} />
          <span className="hidden md:block">
            Summarize
          </span>
        </button>

      </div>

    </div>

  );

}

export default ChatInput;