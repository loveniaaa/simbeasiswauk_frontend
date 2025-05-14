import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../../../../../api/apiClient";

const AnnouncementUpdateAdmin = () => {
  const { state } = useLocation();
  const [announcement, setAnnouncement] = useState(state || {});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      const fetchAnnouncement = async () => {
        try {
          const response = await apiClient.get(
            `/announcement/detail?uuid=${state?.uuid}`
          );
          const data = response.data?.result || {};
          setAnnouncement(data);
        } catch (error) {
          console.error("Error fetching announcement:", error);
        }
      };
      fetchAnnouncement();
    }
  }, [state]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await apiClient.put("/announcement/update", announcement);
      setLoading(false);
      navigate("/admin/pengumuman");
    } catch (error) {
      setLoading(false);
      console.error("Error updating announcement:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnnouncement({ ...announcement, [name]: value });
  };

  return (
    <section className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto"> {/* Tambahkan ini agar form lebih lebar */}
          <div className="card shadow-lg border-0 rounded-4 p-4">
            <div className="card-body">
              <h2 className="h4 fw-bold text-primary mb-4 text-center">Update Pengumuman</h2>
              <form>
                {/* ... semua form input tetap sama */}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Judul Pengumuman</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    value={announcement.title || ""}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Kategori */}
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Kategori</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    className="form-control"
                    value={announcement.category || ""}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Tanggal Terbit */}
                <div className="mb-3">
                  <label htmlFor="publish_date" className="form-label">Tanggal Terbit</label>
                  <input
                    type="date"
                    id="publish_date"
                    name="publish_date"
                    className="form-control"
                    value={announcement.publish_date || ""}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Tanggal Tampil */}
                <div className="mb-3">
                  <label htmlFor="display_date" className="form-label">Tanggal Tampil</label>
                  <input
                    type="date"
                    id="display_date"
                    name="display_date"
                    className="form-control"
                    value={announcement.display_date || ""}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Deskripsi */}
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Deskripsi</label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-control"
                    rows="5"
                    value={announcement.description || ""}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Tombol */}
                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-primary px-4"
                    onClick={handleUpdate}
                    disabled={loading}
                  >
                    {loading ? "Menyimpan..." : "Simpan Perubahan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default AnnouncementUpdateAdmin;
