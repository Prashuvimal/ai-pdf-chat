import { FiSearch } from "react-icons/fi";

function SearchBar() {
  return (
    <div className="relative mb-5">
      <FiSearch className="absolute left-3 top-3 text-gray-400" />

      <input
        placeholder="Search PDFs..."
        className="w-full border rounded-xl pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default SearchBar;