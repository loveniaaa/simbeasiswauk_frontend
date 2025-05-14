import React, { useState } from "react";
import DocumentUploadHeader from "./DocumentUploadHeader";
import FileUploadField from "./UploadFileFields";
import apiClient from "../../../../../api/apiClient";

const FormPendaftaranDocumentKip = () => {
  const [files, setFiles] = useState({});
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e, name) => {
    setFiles((prev) => ({
      ...prev,
      [name]: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const user = JSON.parse(localStorage.getItem("user")); // Ambil user (untuk token)
      const scholarship = JSON.parse(localStorage.getItem("scholarship")); // Ambil beasiswa
      const uploadedBy = scholarship?.uuid;

      if (!uploadedBy) {
        alert("Gagal menemukan UUID beasiswa. Silakan daftar ulang.");
        setUploading(false);
        return;
      }

      for (const [category, file] of Object.entries(files)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("category", category);
        formData.append("uploadedBy", uploadedBy); // ← gunakan UUID beasiswa

        await apiClient.post("/document/upload", formData, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        console.log(`${category} uploaded`);
      }

      alert("Seluruh dokumen berhasil diunggah.");
    } catch (err) {
      console.error("Upload gagal:", err);
      alert("Terjadi kesalahan saat mengunggah dokumen.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="bg-white">
      <div className="container-fluid bg-white py-5 mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-xxl-10">
            <DocumentUploadHeader />
            <form onSubmit={handleSubmit}>
              <FileUploadField label="Pass Foto *" onChange={(e) => handleFileChange(e, "Pass Foto")} />
              <FileUploadField label="Resume Pribadi *" onChange={(e) => handleFileChange(e, "Resume Pribadi")} />
              <FileUploadField label="Motivation Letter *" onChange={(e) => handleFileChange(e, "Motivation Letter")} />
              <FileUploadField label="Fotocopy KTP *" onChange={(e) => handleFileChange(e, "Fotocopy KTP")} />
              <FileUploadField label="Fotocopy KTM *" onChange={(e) => handleFileChange(e, "Fotocopy KTM")} />
              <FileUploadField label="Transkrip Nilai *" onChange={(e) => handleFileChange(e, "Transkrip Nilai")} />

              <button type="submit" className="btn btn-success mt-5 px-4 py-2 fw-semibold" disabled={uploading}>
                {uploading ? "Mengunggah..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FormPendaftaranDocumentKip;
