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

export default function DocumentValidation() {
  const { uploadedBy } = useParams();
  const navigate = useNavigate();

  const [documents, setDocuments] = useState({});
  const [loading, setLoading] = useState(true);
  const [allComplete, setAllComplete] = useState(false);
  const [verifications, setVerifications] = useState({});
  const [notes, setNotes] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [scholarshipUuid, setScholarshipUuid] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        if (!uploadedBy) return;
        const response = await apiClient.get(`/document/get?uploadedBy=${uploadedBy}`);
        const uploadedDocuments = response.data?.output_schema?.records || [];

        const newDocuments = {};
        const newVerifications = {};
        const newNotes = {};

        for (const docName of documentList) {
          const matchedDoc = uploadedDocuments.find((doc) => doc.category === docName);
          if (matchedDoc) {
            newDocuments[docName] = matchedDoc;
            newVerifications[docName] = matchedDoc.isVerified ?? null;
            newNotes[docName] = matchedDoc.note || "";
          } else {
            newDocuments[docName] = null;
            newVerifications[docName] = null;
            newNotes[docName] = "";
          }
        }

        setDocuments(newDocuments);
        setVerifications(newVerifications);
        setNotes(newNotes);
        setAllComplete(Object.values(newDocuments).every(Boolean));
      } catch (error) {
        setErrorMessage("Gagal mengambil dokumen, silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    const fetchScholarshipUuid = async () => {
      try {
        const response = await apiClient.get(`/scholarship/detail?userUuid=${uploadedBy}`);
        const result = response.data?.output_schema?.result;
        if (result?.uuid) {
          setScholarshipUuid(result.uuid);
        }
      } catch (error) {
        console.error("Gagal mengambil data beasiswa:", error);
      }
    };

    const fetchAll = async () => {
      await fetchDocuments();
      await fetchScholarshipUuid();
    };

    if (uploadedBy) fetchAll();
  }, [uploadedBy]);

  const handleVerificationChange = (category, value) => {
    setVerifications((prev) => ({ ...prev, [category]: value }));
  };

  const handleNoteChange = (category, value) => {
    setNotes((prev) => ({ ...prev, [category]: value }));
  };

  const handleVerifySubmit = async (category) => {
    try {
      const document = documents[category];
      const isVerified = verifications[category];
      const note = notes[category] ?? "";

      console.log("Verifikasi Submit:", {
        uuid: document.uuid,
        isVerified,
        note,
      });

      if (isVerified === null) return;

      const confirmMsg =
        isVerified === true
          ? `Validasi dokumen "${category}"?`
          : `Tolak dokumen "${category}"?`;

      if (!window.confirm(confirmMsg)) return;

      await apiClient.patch(
        `/document/verify?uuid=${document.uuid}&isVerified=${isVerified}&note=${encodeURIComponent(note)}`
      );
      alert(`Dokumen "${category}" telah diverifikasi.`);
    } catch (error) {
      alert(`Gagal memverifikasi dokumen "${category}".`);
    }
  };


  const handleDocumentCompletionStatus = async () => {
    try {
      const isAllVerified = Object.values(verifications).every((v) => v === true);

      if (!scholarshipUuid) {
        alert("UUID beasiswa tidak ditemukan.");
        return;
      }

      if (isAllVerified) {
        await apiClient.patch(
          `/document/completion-status?uploadedBy=${scholarshipUuid}&isComplete=true`
        );
        alert("Dokumen lengkap dan status beasiswa telah diperbarui.");
        navigate(`/bidang/informasi-pendaftar/data-pendaftar/${uploadedBy}`);
      } else {
        alert("Dokumen belum lengkap atau belum tervalidasi.");
      }
    } catch (error) {
      alert("Gagal memperbarui status kelengkapan dokumen.");
    }
  };

  const previewDocument = async (uuid) => {
    try {
      const response = await apiClient.get(`/document/preview/${uuid}`, {
        responseType: "blob",
      });
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      window.open(URL.createObjectURL(blob), "_blank");
    } catch {
      alert("Gagal membuka dokumen.");
    }
  };

  return (
    <section className="mt-0">
      {loading && <div className="text-center py-4">Memuat data...</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      {!loading && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fs-4 fw-bold m-0">Cek Dokumen</h2>
            <div className="d-flex gap-2">
              <span>Status</span>
              <span>:</span>
              <span
                className={
                  allComplete && Object.values(verifications).every((v) => v === true)
                    ? "text-success"
                    : "text-danger"
                }
              >
                {allComplete && Object.values(verifications).every((v) => v === true)
                  ? "Dokumen Valid dan Lengkap"
                  : "Belum Valid atau Tidak Lengkap"}
              </span>
            </div>
          </div>

          <div className="list-group border-0">
            {documentList.map((doc, idx) => (
              <div key={idx} className="list-group-item border-0 bg-transparent mb-3">
                <div className="d-flex align-items-center gap-3 mb-2">
                  <span className="fw-medium">{doc}</span>
                  <span className="mx-2">:</span>
                  {documents[doc] ? (
                    <button
                      className="btn btn-sm btn-outline-success"
                      onClick={() => previewDocument(documents[doc]?.uuid)}
                    >
                      Lihat
                    </button>
                  ) : (
                    <span className="text-muted">Tidak ada File</span>
                  )}

                  {verifications[doc] === true && (
                    <span className="badge bg-success">Valid</span>
                  )}
                  {verifications[doc] === false && (
                    <span className="badge bg-danger">Tidak Valid</span>
                  )}
                  {verifications[doc] === null && (
                    <span className="badge bg-secondary">Belum Dicek</span>
                  )}
                </div>

                {documents[doc] && (
                  <div className="ps-4">
                    <div className="mb-2">
                      <label className="form-label mb-1">Catatan:</label>
                      <textarea
                        rows="2"
                        className="form-control"
                        value={notes[doc] || ""}
                        onChange={(e) => handleNoteChange(doc, e.target.value)}
                      />
                    </div>
                    <div className="mb-3 d-flex align-items-center gap-3">
                      <input
                        type="checkbox"
                        checked={verifications[doc] === true}
                        onChange={(e) => {
                          const newValue = e.target.checked;
                          console.log(`Checkbox "${doc}" diubah jadi:`, newValue);
                          handleVerificationChange(doc, newValue);
                        }}
                      />

                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleVerifySubmit(doc)}
                      >
                        Simpan Verifikasi
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            className="btn btn-success rounded-pill px-5 mt-5"
            disabled={!allComplete || !scholarshipUuid}
            onClick={handleDocumentCompletionStatus}
          >
            {allComplete ? "Selesai" : "Lengkapi Dulu"}
          </button>
        </>
      )}
    </section>
  );
}
