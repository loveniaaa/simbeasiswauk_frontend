import React, { useEffect, useState } from "react";
import { AnnouncementCard } from "./AnnouncementCard";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../../../api/apiClient";
import DeleteConfirmationModal from "./Delete";

export const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = storedUser?.token;

        const response = await apiClient.get("/announcement/list", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const records = Array.isArray(response.data) ? response.data : [];
        setAnnouncements(records);
      } catch (error) {
        console.error("Gagal mengambil pengumuman:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleDelete = async () => {
    if (!announcementToDelete) return;

    try {
      await apiClient.delete(`/announcement/delete?uuid=${announcementToDelete.uuid}`);
      setAnnouncements((prev) => prev.filter((item) => item.uuid !== announcementToDelete.uuid));
      setShowDeleteModal(false); // Close the modal
    } catch (error) {
      console.error("Gagal menghapus pengumuman:", error);
    }
  };

  const handleDetail = (uuid) => {
    navigate(`/admin/pengumuman/detail/${uuid}`);
  };

  const handleUpdate = (uuid) => {
    navigate(`/admin/pengumuman/update/${uuid}`);
  };

  const openDeleteModal = (announcement) => {
    setAnnouncementToDelete(announcement);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setAnnouncementToDelete(null);
  };

  return (
    <section className="py-4">
      <h2 className="h4 fw-bold mb-4">Pengumuman</h2>

      <Link
        to="/admin/pengumuman/add"
        className="btn btn-light rounded-3 d-flex align-items-center gap-3 mb-4"
      >
        <span className="fs-5">Tambahkan Pengumuman</span>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/6e56f22283ca426d8ccf6afbc1731b56/f86c0f5ab4188643405595cb3b98aa2a04ca2d6e?placeholderIfAbsent=true"
          alt="Add"
          style={{ width: "24px", height: "24px" }}
        />
      </Link>

      {announcements.length > 0 ? (
        announcements.map((announcement) => (
          <AnnouncementCard
            key={announcement.uuid}
            uuid={announcement.uuid}
            title={announcement.title || "(Tanpa Judul)"}
            category={announcement.category || "-"}
            date={new Date(announcement.createdAt).toLocaleDateString()}
            onDetail={() => handleDetail(announcement.uuid)}
            onUpdate={() => handleUpdate(announcement.uuid)}
            onDelete={() => openDeleteModal(announcement)}
          />
        ))
      ) : (
        <p className="text-muted">Belum ada pengumuman yang tersedia.</p>
      )}

      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        title={announcementToDelete?.title || ""}
      />
    </section>
  );
};
