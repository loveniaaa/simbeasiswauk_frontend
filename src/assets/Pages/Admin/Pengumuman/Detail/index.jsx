import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import apiClient from "../../../../../api/apiClient";

const AnnouncementDetailAdmin = () => {
  const { uuid } = useParams();
  const { state } = useLocation();
  const [announcement, setAnnouncement] = useState(state || {});
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      const fetchAnnouncementDetail = async () => {
        try {
          const response = await apiClient.get(`/announcement/detail?uuid=${uuid}`);
          const data = response.data?.output_schema?.result || {};
          setAnnouncement(data);
        } catch (error) {
          console.error("Gagal mengambil detail pengumuman:", error);
        }
      };
      fetchAnnouncementDetail();
    }
  }, [uuid, state]);

  const formatDate = (dateString) => {
    if (!dateString) return "Tanggal tidak tersedia";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Format tanggal tidak valid" : date.toLocaleDateString();
  };

  return (
    <section className="container py-5">
      <div className="card shadow-lg border-0 rounded-4 p-4">
        <div className="card-body">
          <h2 className="card-title fw-bold text-primary mb-3 text-center">
            {announcement.title || "Judul tidak tersedia"}
          </h2>
          <div className="text-muted text-center mb-4">
            <div className="mb-2">
              <i className="bi bi-calendar-event me-2"></i>
              <strong>Tanggal Terbit:</strong> {formatDate(announcement.publish_date)}
            </div>
            <div className="mb-2">
              <i className="bi bi-eye me-2"></i>
              <strong>Tanggal Tampil:</strong> {formatDate(announcement.display_date)}
            </div>
            <div>
              <i className="bi bi-folder me-2"></i>
              <strong>Kategori:</strong> {announcement.category || "Kategori tidak tersedia"}
            </div>
          </div>
          <hr />
          <p className="card-text fs-5" style={{ whiteSpace: "pre-line" }}>
            {announcement.description || "Deskripsi tidak tersedia"}
          </p>
          <div className="text-end mt-4">
            <button
              className="btn btn-outline-primary"
              onClick={() =>
                navigate(`/admin/pengumuman/update/${announcement.uuid}`, {
                  state: announcement,
                })
              }
            >
              <i className="bi bi-pencil-square me-1"></i>
              Edit Pengumuman
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnnouncementDetailAdmin;
