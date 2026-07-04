import { FiUploadCloud, FiFileText } from "react-icons/fi";

function UploadBox({
  file,
  uploading,
  onFileChange,
  onUpload,
}) {
  return (
    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-6 text-center">

      <FiUploadCloud
        size={45}
        className="mx-auto text-blue-600 mb-4"
      />

      <h3 className="font-semibold text-lg dark:text-white">
        Upload PDF
      </h3>

      <p className="text-gray-500 text-sm mt-2 mb-5">
        Select a PDF to start chatting.
      </p>

      {/* Choose Button */}

      <label
        className={`inline-block px-5 py-2 rounded-xl transition ${
          uploading
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer"
        }`}
      >
        Choose PDF

        <input
          type="file"
          accept=".pdf"
          disabled={uploading}
          onChange={onFileChange}
          className="hidden"
        />

      </label>

      {/* Selected File */}

      {file && (

        <div className="mt-5 bg-blue-50 dark:bg-gray-800 rounded-xl p-3 text-left">

          <div className="flex gap-3">

            <FiFileText
              size={22}
              className="text-red-500 mt-1 flex-shrink-0"
            />

            <div className="min-w-0">

              <p className="font-medium dark:text-white break-words">
                {file.name}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>

            </div>

          </div>

        </div>

      )}

      {/* Upload Button */}

      <button
        onClick={onUpload}
        disabled={!file || uploading}
        className={`w-full mt-5 py-3 rounded-xl font-semibold transition ${
          !file || uploading
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {uploading ? "Uploading..." : "Upload PDF"}
      </button>

    </div>
  );
}

export default UploadBox;