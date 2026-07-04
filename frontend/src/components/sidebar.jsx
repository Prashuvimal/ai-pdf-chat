import { useState } from "react";
import api from "../services/api";

import UploadBox from "./uploadbox";
import PdfCard from "./pdfcard";

function Sidebar({ selectedPdf, setSelectedPdf }) {

  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  async function uploadPDF() {

    if (!file) {
      alert("Please select a PDF first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {

      setUploading(true);

      const response = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const pdf = {
        filename: response.data.filename,
        collection_name: response.data.collection_name,
      };

      setUploadedFiles(prev => [
        ...prev,
        pdf,
      ]);

      // Make uploaded PDF active
      setSelectedPdf(pdf);

      setFile(null);
      setUploading(false);

      alert("✅ PDF Uploaded Successfully!");

    } catch (error) {

      console.error(error);

      setUploading(false);

      if (error.response) {
        alert(`Upload Failed: ${JSON.stringify(error.response.data)}`);
      } else {
        alert(error.message);
      }

    }

  }

  async function deletePDF(pdf) {

    try {

      await api.delete(`/delete/${pdf.collection_name}`);

      const updated = uploadedFiles.filter(
        item => item.collection_name !== pdf.collection_name
      );

      setUploadedFiles(updated);

      if (
        selectedPdf &&
        selectedPdf.collection_name === pdf.collection_name
      ) {

        if (updated.length > 0)
          setSelectedPdf(updated[0]);
        else
          setSelectedPdf(null);

      }

    } catch (err) {

      console.error(err);
      alert("Delete failed");

    }

  }

  return (

    <aside className="w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col p-6">

      {/* Heading */}

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Documents
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Upload and manage your PDFs
        </p>

      </div>

      {/* Upload */}

      <UploadBox
        file={file}
        uploading={uploading}
        onFileChange={(e) => setFile(e.target.files[0])}
        onUpload={uploadPDF}
      />

      {/* Divider */}

      <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

      {/* PDF List */}

      <div className="flex-1 overflow-y-auto">

        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">
          Uploaded PDFs
        </h3>

        {uploadedFiles.length === 0 ? (

          <div className="text-center mt-10">

            <div className="text-5xl mb-3">
              📄
            </div>

            <p className="text-gray-500 dark:text-gray-400">
              No PDFs uploaded yet
            </p>

            <p className="text-sm text-gray-400 mt-2">
              Upload a PDF to start chatting.
            </p>

          </div>

        ) : (

          uploadedFiles.map((pdf) => (

            <PdfCard
              key={pdf.collection_name}
              name={pdf.filename}
              active={
                selectedPdf &&
                selectedPdf.collection_name === pdf.collection_name
              }
              onClick={() => setSelectedPdf(pdf)}
              onDelete={() => deletePDF(pdf)}
            />

          ))

        )}

      </div>

    </aside>

  );

}

export default Sidebar;