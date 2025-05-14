import React from "react";
import DocumentUploadHeader from "./DocumentUploadHeader";
import FileUploadField from "./UploadFileFields";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

const FormPendaftaranDocumentGenBI = () => {
  const [files, setFiles] = React.useState({});
  const [uploading, setUploading] = React.useState(false);
  const [success, setSuccess] = React.useState(false); // State to track success
  const [error, setError] = React.useState(""); // State to track error message
  const navigate = useNavigate(); // Initialize the navigate function

  const handleFileChange = (e, name) => {
    setFiles((prev) => ({
      ...prev,
      [name]: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setSuccess(false); // Reset success state on each submit
    setError(""); // Reset any error

    try {
      const user = JSON.parse(localStorage.getItem("user")); // Get user from localStorage
      const uploadedBy = user?.user?.uuid; // Get user UUID

      if (!uploadedBy) {
        alert("Gagal menemukan UUID user. Silakan login ulang.");
        setUploading(false);
        return;
      }

      for (const [category, file] of Object.entries(files)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("category", category);
        formData.append("uploadedBy", uploadedBy); // Add UUID

        await axios.post("https://simbeasiswauk.site:9900/sms-mgmt/document/upload", formData, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        console.log(`${category} uploaded`);
      }

      setSuccess(true); // Set success to true once all files are uploaded
      setUploading(false); // Stop uploading
    } catch (err) {
      console.error("Upload gagal", err);
      setError("Terjadi kesalahan saat mengunggah dokumen.");
      setUploading(false); // Stop uploading in case of error
    }
  };

  // If the form submission is successful, show a success notification
  if (success) {
    return (
      <div className="success-container">
        <h3>Dokumen berhasil diunggah!</h3>
        <p>Pendaftaran Anda berhasil. Silakan klik tombol di bawah untuk kembali ke homepage.</p>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/")} // Redirect to homepage
        >
          Kembali ke Homepage
        </button>
      </div>
    );
  }

  return (
    <main className="bg-white">
      <div className="container-fluid bg-white py-5 mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-xxl-10">
            <DocumentUploadHeader />
            <form onSubmit={handleSubmit}>
              <FileUploadField label="Pass Foto *" onChange={(e) => handleFileChange(e, "Pass Foto")} />
              <FileUploadField label="Form Biodata A1 *" onChange={(e) => handleFileChange(e, "Form Biodata A1")} />
              <FileUploadField label="Form Keterampilan *" onChange={(e) => handleFileChange(e, "Form Keterampilan")} />
              <FileUploadField label="Surat Keterangan Tidak Mampu" onChange={(e) => handleFileChange(e, "Surat Keterangan Tidak Mampu")} />
              <FileUploadField label="Resume Pribadi *" onChange={(e) => handleFileChange(e, "Resume Pribadi")} />
              <FileUploadField label="Motivation Letter *" onChange={(e) => handleFileChange(e, "Motivation Letter")} />
              <FileUploadField label="Surat Pernyataan sedang tidak menerima beasiswa lain *" onChange={(e) => handleFileChange(e, "Surat Pernyataan Tidak Menerima Beasiswa Lain")} />
              <FileUploadField label="Surat Pernyataan Bermetrai *" onChange={(e) => handleFileChange(e, "Surat Pernyataan Bermetrai")} />
              <FileUploadField label="Fotocopy KTP *" onChange={(e) => handleFileChange(e, "Fotocopy KTP")} />
              <FileUploadField label="Fotocopy KTM *" onChange={(e) => handleFileChange(e, "Fotocopy KTM")} />
              <FileUploadField label="Transkrip Nilai *" onChange={(e) => handleFileChange(e, "Transkrip Nilai")} />

              <button type="submit" className="btn btn-success mt-5 px-4 py-2 fw-semibold" disabled={uploading}>
                {uploading ? "Mengunggah..." : "Submit"}
              </button>
            </form>
            {error && <div className="error-message">{error}</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default FormPendaftaranDocumentGenBI;
