import { FiFileText, FiTrash2 } from "react-icons/fi";

function PdfCard({
  name,
  active,
  onClick,
  onDelete,
}) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-xl border p-4 mb-3 transition-all

      ${
        active
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
          : "border-gray-200 dark:border-gray-700 hover:border-blue-400"
      }`}
    >
      <div className="flex justify-between items-start">

        <div className="flex items-center gap-3 flex-1 min-w-0">

          <FiFileText
            size={22}
            className="text-red-500 flex-shrink-0"
          />

          <div className="min-w-0">

            <p className="font-medium dark:text-white break-words">
              {name}
            </p>

            {active && (
              <p className="text-xs text-blue-600 font-semibold mt-1">
                ● Active PDF
              </p>
            )}

          </div>

        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-red-500 hover:text-red-700 transition"
        >
          <FiTrash2 size={18} />
        </button>

      </div>
    </div>
  );
}

export default PdfCard;