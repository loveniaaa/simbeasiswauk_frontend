import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import AdminLayout from '../components/AdminLayout';
import BeasiswaItem from '../components/BeasiswaItem';
import { Link } from 'react-router-dom';
import apiClient from '../../../../api/apiClient';

const ManajemenBeasiswa = () => {
  const [beasiswaList, setBeasiswaList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newBeasiswa, setNewBeasiswa] = useState({ scholarshipName: '', logo: '' });

  useEffect(() => {
    const fetchBeasiswa = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const token = storedUser?.token;

        const response = await apiClient.get('/scholarshipType/get', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const records = response.data.output_schema.records;
        setBeasiswaList(records);
      } catch (error) {
        console.error('Gagal mengambil daftar beasiswa:', error);
      }
    };

    fetchBeasiswa();
  }, []);

  const handleAddBeasiswa = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const token = storedUser?.token;

      await apiClient.post('/scholarshipType/create', newBeasiswa, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setShowModal(false);
      setNewBeasiswa({ scholarshipName: '', logo: '' });
      window.location.reload();
    } catch (error) {
      console.error('Gagal menambahkan beasiswa:', error);
    }
  };

  const handleUpdate = (uuid) => {
    alert(`Update beasiswa dengan UUID: ${uuid}`);
  };

  const handleDelete = async (uuid) => {
    if (window.confirm('Apakah yakin ingin menghapus beasiswa ini?')) {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const token = storedUser?.token;

        await apiClient.delete(`/scholarshipType/delete?uuid=${uuid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBeasiswaList(beasiswaList.filter(b => b.uuid !== uuid));
      } catch (error) {
        console.error('Gagal menghapus beasiswa:', error);
      }
    }
  };

  const handleDetail = (uuid) => {
    alert(`Lihat detail beasiswa dengan UUID: ${uuid}`);
  };

  return (
    <AdminLayout>
      <div className="container mt-4">
        <h3>Daftar Beasiswa</h3>
        <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
          Tambah Beasiswa +
        </button>

        {beasiswaList.map((beasiswa) => (
          <BeasiswaItem
            key={beasiswa.uuid}
            beasiswa={{
              id: beasiswa.uuid,
              nama: beasiswa.scholarshipName || 'Tanpa Nama',
              logo: beasiswa.logo || ''
            }}
            onUpdate={() => handleUpdate(beasiswa.uuid)}
            onDelete={() => handleDelete(beasiswa.uuid)}
            onDetail={() => handleDetail(beasiswa.uuid)}
          />
        ))}

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah Beasiswa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nama Beasiswa</Form.Label>
                <Form.Control
                  type="text"
                  value={newBeasiswa.scholarshipName}
                  onChange={(e) => setNewBeasiswa({ ...newBeasiswa, scholarshipName: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Logo URL</Form.Label>
                <Form.Control
                  type="text"
                  value={newBeasiswa.logo}
                  onChange={(e) => setNewBeasiswa({ ...newBeasiswa, logo: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Batal</Button>
            <Button variant="primary" onClick={handleAddBeasiswa}>Tambah</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default ManajemenBeasiswa;
