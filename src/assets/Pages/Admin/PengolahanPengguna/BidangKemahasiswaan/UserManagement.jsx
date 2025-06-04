"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import apiClient from "../../../../../api/apiClient";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    //email: "",
    non_student_email: "",
  });
  const [updateFormData, setUpdateFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    //email: "",
    non_student_email: "",
  }); // New state for update modal
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.token;

      const response = await apiClient.get("/master-user/get", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const allUsers = response.data.output_schema.records || [];
      const bidangUsers = allUsers.filter((user) => user.role?.roleId === "02");
      setUsers(bidangUsers);
    } catch (error) {
      console.error("Gagal mengambil data user:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateInputChange = (e) => { // Handler for updating data
    const { name, value } = e.target;
    setUpdateFormData({ ...updateFormData, [name]: value });
  };

  const handleSubmitUser = async () => {
    try {
      setLoadingSubmit(true);
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.token;

      const payload = {
        uuid: null,
        username: formData.username,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone_number: formData.phone_number,
        non_student_email: formData.non_student_email,
        role_id: "02",
        status: true,
      };

      await apiClient.post("/master-user/create", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("User berhasil ditambahkan.");
      setShowModal(false);
      setFormData({
        username: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        non_student_email: "",
      });
      fetchUsers();
    } catch (error) {
      console.error("Gagal menambahkan user:", error);
      alert("Gagal menambahkan user.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleSubmitUpdateUser = async () => {
    try {
      setLoadingSubmit(true);
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.token;

      const payload = {
        ...updateFormData,
        role_id: "02",
      };

      await apiClient.put("/master-user/update", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("User berhasil diperbarui.");
      setShowUpdateModal(false);
      fetchUsers();
    } catch (error) {
      console.error("Gagal memperbarui user:", error);
      alert("Gagal memperbarui user.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleDeleteUser = async (uuid) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.token;

      await apiClient.delete(`/master-user/delete?uuid=${uuid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("User berhasil dihapus.");
      fetchUsers();
    } catch (error) {
      console.error("Gagal menghapus user:", error);
      alert("Gagal menghapus user.");
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.last_name} ${user.first_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="p-4">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-4 mb-4">
        <h1 className="h4 fw-bold mb-0">Daftar Bidang Kemahasiswaan</h1>
        <div className="input-group w-auto flex-grow-1">
          <span className="input-group-text bg-light border-0">
            <i className="bi bi-search text-secondary" />
          </span>
          <input
            type="text"
            className="form-control border-0 bg-light"
            placeholder="Cari nama user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <button className="btn btn-light rounded-3 d-flex align-items-center gap-2 mb-4" onClick={() => setShowModal(true)}>
        <i className="bi bi-person-plus fs-5" />
        <span className="fs-6">Tambahkan User</span>
      </button>

      <div className="user-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <div key={index}>
              <UserCard
                user={{
                  avatar: user.avatar || "https://ui-avatars.com/api/?name=Unknown",
                  name: `${user.firstName} ${user.lastName}`,
                  email: user.email,
                }}
                onUpdate={() => {
                  setUpdateFormData({
                    username: user.username,
                    first_name: user.firstName,
                    last_name: user.lastName,
                    phone_number: user.phoneNumber,
                    email: user.email,
                    non_student_email: user.nonStudentEmail,
                  });
                  setShowUpdateModal(true);
                }}
                onDelete={() => handleDeleteUser(user.uuid)}
              />
            </div>
          ))
        ) : (
          <p className="text-muted">Tidak ada user ditemukan.</p>
        )}
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Tambah User Bidang Kemahasiswaan</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <input name="username" className="form-control mb-2" placeholder="Username" value={formData.username} onChange={handleInputChange} />
                <input name="first_name" className="form-control mb-2" placeholder="Nama Depan" value={formData.first_name} onChange={handleInputChange} />
                <input name="last_name" className="form-control mb-2" placeholder="Nama Belakang" value={formData.last_name} onChange={handleInputChange} />
                <input name="phone_number" className="form-control mb-2" placeholder="Nomor Telepon" value={formData.phone_number} onChange={handleInputChange} />
                <input name="non_student_email" className="form-control mb-2" placeholder="Email Non-Student" type="email" value={formData.non_student_email} onChange={handleInputChange} />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Batal</button>
                <button className="btn btn-primary" onClick={handleSubmitUser} disabled={loadingSubmit}>
                  {loadingSubmit ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update User Modal */}
      {showUpdateModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update User Bidang Kemahasiswaan</h5>
                <button type="button" className="btn-close" onClick={() => setShowUpdateModal(false)}></button>
              </div>
              <div className="modal-body">
                <input name="username" className="form-control mb-2" placeholder="Username" value={updateFormData.username} onChange={handleUpdateInputChange} />
                <input name="first_name" className="form-control mb-2" placeholder="Nama Depan" value={updateFormData.first_name} onChange={handleUpdateInputChange} />
                <input name="last_name" className="form-control mb-2" placeholder="Nama Belakang" value={updateFormData.last_name} onChange={handleUpdateInputChange} />
                <input name="phone_number" className="form-control mb-2" placeholder="Nomor Telepon" value={updateFormData.phone_number} onChange={handleUpdateInputChange} />
                <input name="non_student_email" className="form-control mb-2" placeholder="Email Non-Student" type="email" value={updateFormData.non_student_email} onChange={handleUpdateInputChange} />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowUpdateModal(false)}>Batal</button>
                <button className="btn btn-primary" onClick={handleSubmitUpdateUser} disabled={loadingSubmit}>
                  {loadingSubmit ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserManagement;
