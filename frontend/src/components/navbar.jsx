import { FaRobot } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import ThemeButton from "./themebutton";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm px-8 py-4 flex items-center justify-between">

      {/* Logo */}
      <div className="flex items-center gap-4">

        <div className="bg-blue-600 text-white p-3 rounded-2xl shadow-md">
          <FaRobot size={22} />
        </div>

        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            AI PDF Chat
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Chat with your documents
          </p>
        </div>

      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 w-96 transition-all focus-within:ring-2 focus-within:ring-blue-500">

          <FiSearch
            size={18}
            className="text-gray-500 dark:text-gray-400"
          />

          <input
            type="text"
            placeholder="Search PDFs..."
            className="bg-transparent ml-3 flex-1 outline-none text-gray-800 dark:text-white placeholder-gray-500"
          />

        </div>

        {/* Theme Toggle */}
        <ThemeButton />

      </div>

    </nav>
  );
}

export default Navbar;