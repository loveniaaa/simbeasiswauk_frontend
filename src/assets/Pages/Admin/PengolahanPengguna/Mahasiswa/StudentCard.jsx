"use client";
import React from "react";
import ActionButton from "./ActionButton";

const StudentCard = ({ student }) => {
  return (
    <article className="bg-light rounded-3 p-3 d-flex align-items-center justify-content-between gap-3 flex-wrap mt-4">
      <div className="d-flex align-items-center gap-4">
        <img
          src={student.avatar || "https://ui-avatars.com/api/?name=Unknown"}
          alt="Student Avatar"
          className="rounded-circle"
          style={{ width: "40px", aspectRatio: "1", objectFit: "contain" }}
        />
        <div className="d-flex flex-column">
          <p
            className="mb-0"
            style={{ fontSize: "10px", color: "rgb(97, 97, 97)" }}
          >
            {student.faculty}
          </p>
          <h3 className="mb-0 mt-1" style={{ fontSize: "16px" }}>
            {student.name}
          </h3>
          <p
            className="mb-0 mt-1"
            style={{ fontSize: "12px", color: "rgb(97, 97, 97)" }}
          >
            {student.id}
          </p>
        </div>
      </div>
      <div className="text-secondary" style={{ fontSize: "16px" }}>
        {student.scholarshipType}
      </div>
      <div className="d-flex gap-2">
      <ActionButton label="Detail" iconClass="bi-info-circle" variant="info"/>
      <ActionButton label="Update" iconClass="bi-pencil" variant="primary"/>
      <ActionButton label="Delete" iconClass="bi-trash" variant="danger"/>

      </div>
    </article>
  );
};

export default StudentCard;
