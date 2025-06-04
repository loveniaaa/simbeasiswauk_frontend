import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import AdminLayout from '../../../Pages/Admin/components/AdminLayout';
import axios from 'axios';
import apiClient from '../../../../api/apiClient';

const AddBeasiswa = () => {

    

  const [formData, setFormData] = useState({
    nama: '',
    deskripsi: '',
    tipe: '',
    ipk: '',
    semester: '',
    fakultas: '',
    kuota: '',
    jadwalPendaftaran: '',
    jadwalSeleksi: '',
    logo: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
        alert("Silakan login terlebih dahulu.");
        return;
    }

    try {
      const response = await apiClient.post("/scholarship/create", {
      name: formData.nama,
      description: formData.deskripsi,
      type: formData.tipe,
      minGpa: parseFloat(formData.ipk),
      semester: parseInt(formData.semester),
      faculty: formData.fakultas,
      quota: parseInt(formData.kuota),
      registrationDate: formData.jadwalPendaftaran,
      selectionDate: formData.jadwalSeleksi,
      logoUrl: formData.logo
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

      alert("Beasiswa berhasil ditambahkan!");
      console.log(response.data);

      // Reset form
      setFormData({
        nama: '',
        deskripsi: '',
        tipe: '',
        ipk: '',
        semester: '',
        fakultas: '',
        kuota: '',
        jadwalPendaftaran: '',
        jadwalSeleksi: '',
        logo: ''
      });
    } catch (error) {
      console.error("Gagal menambahkan beasiswa:", error);
      alert("Terjadi kesalahan saat menambahkan beasiswa.");
    }
  };

  return (
    <AdminLayout>
      <Container className="mt-5">
        <h5><a href="/admin/manajemen-beasiswa">Daftar Beasiswa</a> / <span className="text-primary">Tambah Beasiswa</span></h5>
        <Form onSubmit={handleSubmit} className="bg-light p-4 rounded mt-3">
          <Row>
            <Col md={3} className="d-flex justify-content-center align-items-center">
              <div className="border rounded p-4 text-center w-100">
                <span style={{ fontSize: '2rem' }}>📤</span>
                <p>Banner / Logo</p>
                <Form.Control type="text" placeholder="URL Logo" name="logo" value={formData.logo} onChange={handleChange} />
              </div>
            </Col>
            <Col md={9}>
              <Form.Group className="mb-3">
                <Form.Label>Nama Beasiswa</Form.Label>
                <Form.Control type="text" name="nama" value={formData.nama} onChange={handleChange} placeholder="Nama Beasiswa" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Deskripsi</Form.Label>
                <Form.Control type="text" name="deskripsi" value={formData.deskripsi} onChange={handleChange} placeholder="Deskripsi" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Tipe Beasiswa</Form.Label>
                <Form.Select name="tipe" value={formData.tipe} onChange={handleChange}>
                  <option value="">Pilih Tipe</option>
                  <option value="Beasiswa Penuh">Beasiswa Penuh</option>
                  <option value="Beasiswa Parsial">Beasiswa Parsial</option>
                </Form.Select>
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>IPK Minimal</Form.Label>
                    <Form.Control type="number" step="0.01" name="ipk" value={formData.ipk} onChange={handleChange} placeholder="IPK Minimal" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Semester</Form.Label>
                    <Form.Select name="semester" value={formData.semester} onChange={handleChange}>
                      <option value="">Pilih Semester</option>
                      {[...Array(8)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Fakultas</Form.Label>
                    <Form.Select name="fakultas" value={formData.fakultas} onChange={handleChange}>
                      <option value="">Semua</option>
                      <option value="FTI">FTI</option>
                      <option value="Ekonomi">Ekonomi</option>
                      <option value="Filsafat">Filsafat</option>
                      <option value="Kedokteran">Kedokteran</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Kuota</Form.Label>
                <Form.Control type="number" name="kuota" value={formData.kuota} onChange={handleChange} placeholder="Jumlah Pendaftar" />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Jadwal Pendaftaran</Form.Label>
                    <Form.Control type="date" name="jadwalPendaftaran" value={formData.jadwalPendaftaran} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Jadwal Seleksi</Form.Label>
                    <Form.Control type="date" name="jadwalSeleksi" value={formData.jadwalSeleksi} onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>

              <Button variant="success" type="submit">Simpan</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </AdminLayout>
  );
};

export default AddBeasiswa;
