import React, { useEffect, useState } from "react";
import { RegistrationHeader } from "./RegistrationHeader";
import { FormInput } from "./FormInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FormPendaftaranGenBI() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nim, setNim] = useState("");
  const [noRegistration, setNoRegistration] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [highSchoolName, setHighSchoolName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [majorId, setMajorId] = useState("");

  // ✅ Tambahkan state untuk daftar jurusan
  const [majors, setMajors] = useState([]);
  const [success, setSuccess] = useState(false); // State to track success
  const [error, setError] = useState(""); // State for error handling

  const navigate = useNavigate();

  // ✅ Ambil data jurusan dari backend
  useEffect(() => {
    const fetchMajors = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      if (!token) return;

      try {
        const res = await axios.get("http://localhost:9900/sms-mgmt/major/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedMajors = res.data.output_schema.records || [];
        setMajors(fetchedMajors);
      } catch (error) {
        console.error("Gagal mengambil data jurusan:", error);
      }
    };

    fetchMajors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      uuid: crypto.randomUUID(),
      nim,
      first_name: firstName,
      last_name: lastName,
      nomor_registrasi: noRegistration,
      scholarship_type: "GenBI", 
      address_line_1: addressLine1,
      address_line_2: addressLine2,
      high_school_name: highSchoolName,
      father_name: fatherName,
      mother_name: motherName,
      major_id: majorId,
    };

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    if (!token) {
      alert("Silakan login terlebih dahulu.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:9900/sms-mgmt/scholarship/create",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    
      // ✅ Simpan hasil ke localStorage
      localStorage.setItem("scholarship", JSON.stringify(response.data.output_schema.result));
    
      setSuccess(true); // Set success to true once submission is successful
      setError(""); // Reset any error
    } catch (error) {
      console.error("Gagal mengirim data:", error.response?.data || error.message);
      setError("Gagal mengirim data!");
    }
  };

  // If the form submission is successful, show a success notification
  if (success) {
    return (
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card shadow-lg p-4 text-center animate__animated animate__fadeInUp" style={{ maxWidth: "500px" }}>
          <div className="text-success mb-3">
            <i className="bi bi-check-circle-fill" style={{ fontSize: "3rem" }}></i>
          </div>
          <h3 className="fw-bold text-primary">Pendaftaran Berhasil!</h3>
          <p className="text-muted">
            Data pendaftaran Anda telah berhasil disimpan. Klik tombol di bawah untuk melanjutkan ke tahap berikutnya.
          </p>
          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/beasiswa/genbi/form-pendaftaran/document")}
          >
            Lanjutkan ke Pendaftaran Dokumen
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-white" style={{ fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif" }}>
      <div className="container-fluid bg-white py-5 mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-xxl-10">
            <form className="px-4" onSubmit={handleSubmit}>
              <RegistrationHeader />

              <FormInput label="NIM" placeholder="type here" value={nim} onChange={(e) => setNim(e.target.value)} />
              <FormInput label="Nomor Regis" placeholder="type here" value={noRegistration} onChange={(e) => setNoRegistration(e.target.value)} />

              <FormInput
                label="Jurusan"
                placeholder="Select"
                isSelect
                value={majorId}
                onChange={(e) => setMajorId(e.target.value)}
                options={majors}
              />

              <FormInput label="Alamat" placeholder="Jl, desa, RT / RW" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} />
              <FormInput placeholder="Kecamatan, Kabupaten/Kota, Provinsi" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} />

              <FormInput label="Asal Sekolah" placeholder="Type here" value={highSchoolName} onChange={(e) => setHighSchoolName(e.target.value)} />
              <FormInput label="Nama Ayah" placeholder="Type here" value={fatherName} onChange={(e) => setFatherName(e.target.value)} />
              <FormInput label="Nama Ibu" placeholder="Type here" value={motherName} onChange={(e) => setMotherName(e.target.value)} />

              <button type="submit" className="btn btn-success px-4 py-2 mt-5 fw-semibold">
                Next
              </button>
            </form>
            {error && <div className="error-message">{error}</div>}
          </div>
        </div>
      </div>
    </main>
  );
}

export default FormPendaftaranGenBI;
