"use client";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../../../../api/apiClient";

const documentList = [
  "Pass Foto",
  "Form Biodata A1",
  "Form Keterampilan",
  "Surat Keterangan Tidak Mampu",
  "Resume Pribadi",
  "Motivation Letter",
  "Surat Pernyataan Tidak Menerima Beasiswa Lain",
  "Surat Pernyataan Bermetrai",
  "Fotocopy KTP",
  "Fotocopy KTM",
  "Transkrip Nilai",
];

export default function ReplaceDocument() {
  const { uploadedBy } = useParams();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState({});
  const [selectedFiles, setSelectedFiles] = useState({});
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchDocuments = async () => {
        try {
            if (!uploadedBy) return;
            const response = await apiClient.get(`/document/get?uploadedBy=${uploadedBy}`);
            const uploadedDocs = response.data?.output_schema?.records || [];

            const docMap = {};
            for (const docName of documentList) {
            const found = uploadedDocs.find((d) => d.category === docName);
            docMap[docName] = found || null;
            }
            setDocuments(docMap);
        } catch (error) {
            console.error("Gagal memuat dokumen:", error);
        } finally {
            setLoading(false);
        }
    };


    fetchDocuments();
  }, [uploadedBy]);

  const handleFileChange = (category, file) => {
    setSelectedFiles((prev) => ({ ...prev, [category]: file }));
    };

    const handleReplace = async (category) => {
    const file = selectedFiles[category];
    const existingDoc = documents[category];
    if (!file) return alert("Silakan pilih file terlebih dahulu.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category); // ✅ kirim langsung
    formData.append("uploadedBy", uploadedBy); // ✅ juga langsung, bukan dalam JSON

    try {
        if (existingDoc) {
        await apiClient.put(`/document/update/${existingDoc.uuid}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        } else {
        await apiClient.post(`/document/upload`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        }
        setSuccess(true);
    } catch (error) {
        console.error("Gagal mengganti/mengunggah dokumen:", error);
        alert(`Gagal memperbarui dokumen "${category}".`);
    }
    };


  const handlePreview = async (uuid) => {
    try {
      const res = await apiClient.get(`/document/preview/${uuid}`, { responseType: "blob" });
      const blob = new Blob([res.data], { type: res.headers["content-type"] });
      window.open(URL.createObjectURL(blob), "_blank");
    } catch {
      alert("Gagal membuka dokumen.");
    }
  };

  if (success) {
    return (
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card shadow-lg p-4 text-center animate__animated animate__fadeInUp" style={{ maxWidth: "500px" }}>
          <div className="text-success mb-3">
            <i className="bi bi-check-circle-fill" style={{ fontSize: "3rem" }}></i>
          </div>
          <h3 className="fw-bold text-primary">Dokumen Diperbarui</h3>
          <p className="text-muted">
            Dokumen Anda telah berhasil diperbarui. Klik tombol di bawah untuk kembali ke halaman dashboard.
          </p>
          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/mahasiswa/dashboard")}
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (loading) return <p>Memuat data...</p>;

  return (
    <section className="p-5 mt-4">
      <h3 className="mt-5 fw-bold">Ganti Dokumen</h3>
      {statusMessage && <div className="alert alert-success">{statusMessage}</div>}

      <div className="table-responsive">
        <table className="table align-middle mb-5">
          <thead className="table-light">
            <tr>
              <th>No</th>
              <th>Jenis Dokumen</th>
              <th>Lihat</th>
              <th>Upload File Baru</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {documentList.map((doc, idx) => {
              const existing = documents[doc];
              return (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{doc}</td>
                  <td>
                    {existing ? (
                      <button className="btn btn-sm btn-outline-success" onClick={() => handlePreview(existing.uuid)}>Lihat</button>
                    ) : (
                      <span className="text-muted">Belum Ada</span>
                    )}
                  </td>
                  <td>
                    <input
                      type="file"
                      className="form-control form-control-sm"
                      onChange={(e) => handleFileChange(doc, e.target.files[0])}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleReplace(doc)}
                      disabled={!selectedFiles[doc]}
                    >
                      {existing ? "Ganti" : "Upload"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
