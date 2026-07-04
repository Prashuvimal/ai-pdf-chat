function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 p-4">

      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>

      <div
        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
        style={{ animationDelay: "0.2s" }}
      ></div>

      <div
        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
        style={{ animationDelay: "0.4s" }}
      ></div>

    </div>
  );
}

export default TypingIndicator;