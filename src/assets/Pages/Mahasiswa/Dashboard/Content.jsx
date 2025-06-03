"use client";
import React, { useEffect, useState } from "react";
import apiClient from "../../../../api/apiClient";

function DashboardContent() {
  const [fullName, setFullName] = useState("");
  const [scholarshipType, setScholarshipType] = useState("-");
  const [registrationDate, setRegistrationDate] = useState("-");

  useEffect(() => {
    const fetchUserAndScholarship = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) return;

      const firstName = storedUser?.user?.first_name || "-";
      const lastName = storedUser?.user?.last_name || "-";
      setFullName(`${lastName}, ${firstName}`);

      const userUuid = storedUser?.user?.uuid;
      const token = storedUser?.token;
      if (!userUuid || !token) return;

      try {
        const response = await apiClient.get(
          `/scholarship/detail?userUuid=${userUuid}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const scholarshipRecords = response.data.output_schema.result;

        if (scholarshipRecords) {
          setScholarshipType(scholarshipRecords.scholarship_type || "-");

          const createdAt = scholarshipRecords.created_at;
          if (createdAt) {
            const dateObj = new Date(createdAt);
            const formattedDate = dateObj.toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            });
            setRegistrationDate(formattedDate);
          }
        }
      } catch (error) {
        console.error("Error fetching scholarship:", error);
      }
    };

    fetchUserAndScholarship();
  }, []);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Onest:wght@100..900&display=swap"
        rel="stylesheet"
      />
      <main className="col-lg-8 mx-auto px-3 py-5" style={{ fontFamily: "'Onest', sans-serif" }}>
        <div className="bg-white p-4 rounded-4 shadow-sm mb-4">
          <h2 className="fw-bold text-primary mb-2">Hai, Selamat Datang 👋</h2>
          <p className="h5 text-secondary">{fullName}</p>
        </div>

        <section className="mb-4">
          <div className="bg-light rounded-4 shadow-sm p-4">
            <h4 className="fw-bold mb-3 text-dark">Informasi Beasiswa</h4>
            <div className="card border-0 shadow-sm rounded-4 bg-white p-3 hover-shadow">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted">Jenis Beasiswa</span>
                <span className="fw-semibold text-dark ms-3">{scholarshipType}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted">Tanggal Daftar</span>
                <span className="fw-semibold text-dark ms-3">{registrationDate}</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="bg-white p-4 rounded-4 shadow-sm">
            <h4 className="fw-bold mb-0 text-dark">📢 Pengumuman</h4>
            <p className="text-muted mt-2">Belum ada pengumuman terbaru saat ini.</p>
          </div>
        </section>
      </main>
    </>
  );
}

export default DashboardContent;
