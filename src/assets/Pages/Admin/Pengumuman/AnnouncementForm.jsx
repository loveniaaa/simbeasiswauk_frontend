"use client";
import React, { useState } from "react";
import FormInput from "./FormInput";
import FileUpload from "./FileUpload";
import { Link } from "react-router-dom";
import "./announcement-form.css";
import apiClient from "../../../../api/apiClient";

function AnnouncementForm() {
  const [form, setForm] = useState({
    uuid: "",
    title: "",
    description: "",
    category: "",
    publish_date: "",
    display_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;

    if (!storedUser || !token) {
      alert("Anda belum login. Silakan login terlebih dahulu.");
      return;
    }

    try {
      const response = await apiClient.post(
        "/announcement/create",
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Pengumuman berhasil dibuat!");
      console.log("Respon:", response.data);

      // Reset form
      setForm({
        uuid: "",
        title: "",
        description: "",
        category: "",
        publish_date: "",
        display_date: "",
      });
    } catch (error) {
      console.error("Gagal buat pengumuman:", error);
      if (error.response?.status === 401) {
        alert("Autentikasi gagal. Silakan login kembali.");
      } else {
        alert("Gagal membuat pengumuman: " + (error.response?.data?.message || error.message));
      }
    }
  };

  return (
    <section className="py-4">
      <div className="d-flex justify-content-between align-items-start mb-4">
        <Link to="/admin/pengumuman" className="d-flex align-items-center gap-2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/6e56f22283ca426d8ccf6afbc1731b56/659fa5f3e981f264647a7f21ca78fa1154d428a4?placeholderIfAbsent=true"
            alt="Icon"
            style={{ width: "25px" }}
          />
          <h1 className="h4 fw-bold mb-0">
            Pengumuman <span className="text-muted">/</span>{" "}
            <span className="text-primary">Pengumuman Baru</span>
          </h1>
        </Link>

        <div className="d-flex align-items-center bg-light rounded-3 py-2 px-3">
          <span className="text-muted me-3">Search</span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/6e56f22283ca426d8ccf6afbc1731b56/7d324a11d19de8fbd804298d8135ece2db18bb3a?placeholderIfAbsent=true"
            alt="Search"
            style={{ width: "16px" }}
          />
        </div>
      </div>

      <form className="bg-light rounded-3 p-4" onSubmit={handleSubmit}>
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="text-center">
              <div
                className="bg-white rounded-3 p-4 d-flex align-items-center justify-content-center hover-upload"
                style={{ height: "150px", width: "150px", cursor: "pointer" }}
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/6e56f22283ca426d8ccf6afbc1731b56/bd35fde20057cda4be331de813726b4ee550668f?placeholderIfAbsent=true"
                  alt="Upload"
                  style={{ width: "70px" }}
                />
              </div>
              <span className="text-muted small mt-2 d-block">Banner / Logo</span>
            </div>
          </div>

          <div className="col-md-9">
            <FormInput
              label="Judul Pengumuman"
              placeholder="Judul"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
            <FormInput
              label="Isi Pengumuman"
              placeholder="Deskripsi"
              multiline
              height={150}
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>
        </div>

        <FormInput
          label="Kategori Pengumuman"
          placeholder="Kategori"
          name="category"
          value={form.category}
          onChange={handleChange}
          icon="https://cdn.builder.io/api/v1/image/assets/6e56f22283ca426d8ccf6afbc1731b56/b8ed412834140eee3b26bb1f0b54e71a8bba8bec?placeholderIfAbsent=true"
        />

        <div className="row mt-4">
          <div className="col-md-6">
            <FormInput
              label="Tanggal Terbit"
              type="date"
              name="publish_date"
              value={form.publish_date}
              onChange={handleChange}
            />
            <h3 className="h6 fw-bold mt-3">Upload Lampiran</h3>
          </div>
          <div className="col-md-6">
            <FormInput
              label="Tanggal Tayang"
              type="date"
              name="display_date"
              value={form.display_date}
              onChange={handleChange}
            />
          </div>
        </div>

        <FileUpload />

        <button
          className="btn btn-success px-4 mt-5 shadow-sm save-btn"
          type="submit"
        >
          Simpan
        </button>
      </form>
    </section>
  );
}

export default AnnouncementForm;
