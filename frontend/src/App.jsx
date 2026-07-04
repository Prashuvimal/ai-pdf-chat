import { useState } from "react";
import api from "./services/api";

import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import ChatWindow from "./components/chatwindow";
import ChatInput from "./components/chatinput";

function App() {

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Welcome! Upload a PDF and start asking questions.",
    },
  ]);

  // Active PDF
  const [selectedPdf, setSelectedPdf] = useState(null);

  // -----------------------------
  // Ask Question
  // -----------------------------

  async function sendMessage(question) {

    if (!question.trim()) return;

    if (!selectedPdf) {
      alert("Please upload and select a PDF first.");
      return;
    }

    // Show user message
    setMessages(prev => [
      ...prev,
      {
        sender: "user",
        text: question,
      },
    ]);

    try {

      const response = await api.post("/chat", {
        question: question,
        collection_name: selectedPdf.collection_name,
      });

      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: response.data.answer,
        },
      ]);

    } catch (error) {

      console.error(error);

      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: "❌ Error talking to Groq.",
        },
      ]);

    }

  }

  // -----------------------------
  // Summarize PDF
  // -----------------------------

  async function summarizePdf() {

    if (!selectedPdf) {
      alert("Please select a PDF first.");
      return;
    }

    // Show user's request
    setMessages(prev => [
      ...prev,
      {
        sender: "user",
        text: "📄 Summarize this PDF",
      },
    ]);

    // Optional loading message
    setMessages(prev => [
      ...prev,
      {
        sender: "bot",
        text: "⏳ Generating summary... This may take a minute for large PDFs.",
      },
    ]);

    try {

      const response = await api.post("/summarize", {
        collection_name: selectedPdf.collection_name,
      });

      // Remove loading message
      setMessages(prev => {
        const updated = [...prev];
        updated.pop();

        return [
          ...updated,
          {
            sender: "bot",
            text: response.data.summary,
          },
        ];
      });

    } catch (error) {

      console.error(error);

      setMessages(prev => {
        const updated = [...prev];
        updated.pop();

        return [
          ...updated,
          {
            sender: "bot",
            text: "❌ Failed to summarize PDF.",
          },
        ];
      });

    }

  }

  return (

    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-950">

      <Navbar />

      <div className="flex flex-1 overflow-hidden">

        <Sidebar
          selectedPdf={selectedPdf}
          setSelectedPdf={setSelectedPdf}
        />

        <div className="flex flex-col flex-1">

          {/* Active PDF */}

          <div className="px-6 py-3 bg-white dark:bg-gray-900 border-b">

            <span className="text-gray-500 text-sm">
              Currently chatting with:
            </span>

            <span className="ml-2 font-semibold text-blue-600">

              {
                selectedPdf
                  ? selectedPdf.filename
                  : "No PDF Selected"
              }

            </span>

          </div>

          <ChatWindow
            messages={messages}
          />

          <ChatInput
            sendMessage={sendMessage}
            summarizePdf={summarizePdf}
          />

        </div>

      </div>

    </div>

  );

}

export default App;