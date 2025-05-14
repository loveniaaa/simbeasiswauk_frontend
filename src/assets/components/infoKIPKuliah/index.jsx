import React, { useContext } from "react";
import styles from "./infokipkuliah.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { KIPLogo } from "../../img"; // pastikan logo diexport dengan benar

function InfoKIPKuliah() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const handleRegisterClick = () => {
    if (isLoggedIn) {
      navigate("/beasiswa/kip/form-pendaftaran");
    } else {
      console.error("User is not logged in. Redirecting to login page.");
      navigate("/login");
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <section className={styles.headerSection}>
          <div className={styles.headerTop}>
            <img
              src={KIPLogo}
              alt="Logo KIP"
              className={styles.programLogo}
            />
            <h2 className={styles.mainTitle}>KIP Kuliah Merdeka</h2>
            <div className={styles.headerRight}>
              <button
                onClick={handleRegisterClick}
                className={styles.registerButton}
              >
                Daftar
              </button>
            </div>
          </div>
        </section>

        <section className={styles.requirementsSection}>
          <h3 className={styles.requirementsTitle}>
            Persyaratan Penerimaan KIP Kuliah Merdeka 2022
          </h3>
          <div className={styles.requirementsContent}>
            <p>
              Pertama: Penerima KIP Kuliah Merdeka adalah lulusan SMA/SMK/sederajat yang lulus pada tahun berjalan atau maksimal lulus 2 tahun sebelumnya.
            </p>
            <p>Kedua: Telah lulus seleksi masuk Perguruan Tinggi dan diterima di program studi terakreditasi.</p>
            <p>Ketiga: Memiliki potensi akademik baik, tetapi keterbatasan ekonomi yang dibuktikan dengan:</p>
            <ul>
              <li>Kartu Indonesia Pintar (KIP)</li>
              <li>Peserta Program Keluarga Harapan (PKH)</li>
              <li>Pemegang Kartu Keluarga Sejahtera (KKS)</li>
              <li>Dari panti asuhan/panti sosial</li>
              <li>Masuk dalam DTKS Kemensos</li>
            </ul>
            <p>
              Jika tidak memenuhi 5 kriteria di atas, tetap bisa mendaftar jika pendapatan orang tua ≤ Rp4.000.000 atau ≤ Rp750.000 per anggota keluarga.
            </p>
            <p>
              Manfaat: pembebasan biaya kuliah, bantuan biaya hidup (800rb–1.4jt/bulan), dan bebas biaya UTBK.
            </p>
            <p>Durasi: 8 semester (Sarjana), 6 semester (D3), dst.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default InfoKIPKuliah;
