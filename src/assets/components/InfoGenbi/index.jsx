import React, { useContext } from "react";
import styles from "./infogenbi.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { LogoGenbi } from "../../img";

const InfoGenbi = () => {
    console.log("Genbi page loaded");
    
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext); // asumsi kamu simpan status login di AuthContext

    const handleRegisterClick = () => {
        if (isLoggedIn) {
            navigate("/beasiswa/genbi/form-pendaftaran");
        } else {
            console.error("User is not logged in. Redirecting to login page.");
            navigate("/login");
        }
    };

    return (
        <>
        <link
            href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700&display=swap"
            rel="stylesheet"
        />
        <div className={styles.pageContainer}>
            <main className={styles.mainContent}>
            <section className={styles.headerSection}>
                <img
                src={LogoGenbi}
                alt="Genbi Logo"
                className={styles.genbiLogo}
                />
                <h2 className={styles.mainTitle}>Generasi Baru Indonesia</h2>
                <button onClick={handleRegisterClick} className={styles.registerButton}>
                    Daftar
                </button>
            </section>
            
            <section className={styles.requirementsSection}>
                <h3 className={styles.requirementsTitle}>
                Syarat Pengajuan Nama Mahasiswa Penerima Beasiswa Baru
                </h3>
                <div className={styles.requirementsList}>
                <p className={styles.requirementItem}>
                    1. Merupakan mahasiswa aktif program S1 yang dibuktikan dengan
                    Kartu Tanda Mahasiswa atau Surat Keterangan Aktif
                </p>
                <p className={styles.requirementItem}>
                    2. Sekurang-kurangnya telah menyelesaiakn 40 (empat puluh)
                    satuan kredit semester (SKS) atau berada di semester 3 (tiga)
                </p>
                <p className={styles.requirementItem}>
                    3. Mahasiswa yang berprestasi di kampus dengan IPK Minimal 3.00
                    (skala 4) untuk PTN dan 3.25 (Skala 4) untuk PTS.
                </p>
                <p className={styles.requirementItem}>
                    4. Maksimal berusia 23 tahun atau belum berusai 24 tahun pada
                    saat ditetapkan sebagai penerima beasiswa.
                </p>
                <p className={styles.requirementItem}>
                    5. Nilai tambah bagi yang mempunyai pengalaman menjalankan
                    aktivitas sosial yang memiliki dampak kebermanfaatan bagi
                    masyarakat.
                </p>
                <p className={styles.requirementItem}>
                    6. Bersedia untuk berperan aktif, mengelola dan mengembangkan
                    Generasi Baru Indonesia (GenBI) serta berpartisipasi dalam
                    kegiatan yang diselenggarakan oleh Bank Indonesia.
                </p>
                <p className={styles.requirementItem}>
                    7. Diutamakan bagi mahasiswa yang berasal dari latar belakang
                    ekonomi keluarga kurang mampu (prasejahtera) yang dibuktikan
                    dengan adanya Surat Keterangan Tidak Mampu (SKTM) dari
                    kelurahan/desa domisili orang tua mahasiswa. Apabila jumlah
                    mahasiswa yang mengajukan SKTM melebihi kuota, maka yang
                    dinyatakan lolos seleksi mengacu pada ranking dari hasil
                    seleksi. Dalam hal tidak terdapat calon penerima beasiswa yang
                    berasal dari kalangan keluarga kurang mampu, maka dibuka
                    kesempatan kepada mahasiswa lainnya sebagai calon penerima
                    beasiswa sepanjang memenuhi persyaratan lainnya yang telah
                    ditentukan.
                </p>
                <p className={styles.requirementItem}>
                    8. Membuat resume pribadi dan motivation letter dalam Bahasa
                    Indonesia.
                </p>
                <p className={styles.requirementItem}>
                    9. Melampirkan Form Biodata A1 dan Form Keterampilan (Form A1
                    dapat diambil di kantor Wakil Rektor III bidang Kemahasiswaan,
                    Lt. 2 GA)
                </p>
                <p className={styles.requirementItem}>
                    10. Membuat Surat Pernyataan Pribadi tidak sedang menerima
                    beasiswa dari Lembaga lain dan/atau berada dalam status ikatan
                    dinas dari Lembaga / instansi lain.
                </p>
                </div>
            </section>
            </main>
        </div>
        </>
    )
}

export default InfoGenbi;