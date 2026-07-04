function Timestamp() {
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <span className="text-xs text-gray-400">
      {time}
    </span>
  );
}

export default Timestamp;