import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import AdminLayout from '../components/AdminLayout';

const BeasiswaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [beasiswa, setBeasiswa] = useState(null);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("beasiswaList")) || [
      {
        id: 1,
        nama: 'GenBI',
        logo: 'https://example.com/logo-genbi.png',
        tanggalBuka: '',
        tanggalTutup: '',
        isAktif: true
      },
      {
        id: 2,
        nama: 'KIP Kuliah',
        logo: 'https://example.com/logo-kip.png',
        tanggalBuka: '',
        tanggalTutup: '',
        isAktif: false
      }
    ];
    const found = storedList.find(b => b.id.toString() === id);
    setBeasiswa(found);
  }, [id]);

  const handleChange = (field, value) => {
    setBeasiswa({ ...beasiswa, [field]: value });
  };

  const handleSave = () => {
    let list = JSON.parse(localStorage.getItem("beasiswaList")) || [];
    list = list.map(b => (b.id.toString() === id ? beasiswa : b));
    localStorage.setItem("beasiswaList", JSON.stringify(list));
    alert("Beasiswa berhasil diperbarui.");
    navigate("/admin/manajemen-beasiswa");
  };

  if (!beasiswa) {
    return (
      <AdminLayout>
        <div className="container mt-4">Beasiswa tidak ditemukan.</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mt-4">
        <h3>Detail & Update Beasiswa</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nama Beasiswa</Form.Label>
            <Form.Control
              type="text"
              value={beasiswa.nama}
              onChange={(e) => handleChange('nama', e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>URL Logo</Form.Label>
            <Form.Control
              type="text"
              value={beasiswa.logo}
              onChange={(e) => handleChange('logo', e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Jadwal Buka</Form.Label>
            <Form.Control
              type="date"
              value={beasiswa.tanggalBuka || ''}
              onChange={(e) => handleChange('tanggalBuka', e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Jadwal Tutup</Form.Label>
            <Form.Control
              type="date"
              value={beasiswa.tanggalTutup || ''}
              onChange={(e) => handleChange('tanggalTutup', e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Beasiswa Aktif"
              checked={beasiswa.isAktif || false}
              onChange={(e) => handleChange('isAktif', e.target.checked)}
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="secondary" onClick={() => navigate("/admin/manajemen-beasiswa")}>
              Kembali
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Simpan Perubahan
            </Button>
          </div>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default BeasiswaDetail;
