"use client";
import React from "react";

export const AnnouncementCard = ({ uuid, date, title, category, onDetail, onUpdate, onDelete }) => {
  return (
    <article className="bg-light rounded-3 p-3 mb-3">
      <div className="d-flex gap-4">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/6e56f22283ca426d8ccf6afbc1731b56/bc5ce1a0ed694690b95b6af81d216c5cde2b95fa?placeholderIfAbsent=true"
          alt="Announcement icon"
          className="rounded-circle"
          style={{ width: "40px", height: "40px" }}
        />
        <div className="flex-grow-1">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/6e56f22283ca426d8ccf6afbc1731b56/bb304231881571f2c0606227c19daad985a723b5?placeholderIfAbsent=true"
                alt="Calendar"
                style={{ width: "13px", height: "13px" }}
              />
              <small className="text-muted">{date}</small>
            </div>
            <small className="text-success">Ditampilkan</small>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-2">
            <h3 className="h6 mb-0 fw-medium">{title}</h3>
            <div className="d-flex gap-2">
              <button
                className="btn btn-sm btn-light rounded-pill px-3 py-1"
                onClick={() => onDetail(uuid)}
              >
                <span className="small">Detail</span>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/6e56f22283ca426d8ccf6afbc1731b56/ace77583411a4ee7faf19261d9fc3d4b8417296d?placeholderIfAbsent=true"
                  alt="Detail"
                  className="ms-2"
                  style={{ width: "14px", height: "14px" }}
                />
              </button>
              <button
                className="btn btn-sm btn-light rounded-pill px-3 py-1"
                onClick={() => onUpdate(uuid)}
              >
                <span className="small">Update</span>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/6e56f22283ca426d8ccf6afbc1731b56/5f095fbcc39d405dd8b2c3fba09177a698108be1?placeholderIfAbsent=true"
                  alt="Update"
                  className="ms-2"
                  style={{ width: "14px", height: "14px" }}
                />
              </button>
              <button
                className="btn btn-sm btn-light rounded-pill px-3 py-1"
                onClick={() => onDelete(uuid)}
              >
                <span className="small">Delete</span>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/6e56f22283ca426d8ccf6afbc1731b56/ad98de4380791ed97542b78558925c97e83a1984?placeholderIfAbsent=true"
                  alt="Delete"
                  className="ms-2"
                  style={{ width: "14px", height: "14px" }}
                />
              </button>
            </div>
          </div>

          <div className="d-flex gap-2 mt-2">
            <small className="text-muted">Kategori</small>
            <small className="text-muted">:</small>
            <small className="text-muted">{category}</small>
          </div>
        </div>
      </div>
    </article>
  );
};
