import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import AdminLayout from '../components/AdminLayout';
import BeasiswaItem from '../components/BeasiswaItem';
import { Link, useNavigate } from 'react-router-dom';
import { KIPLogo, LogoGenbi } from '../../../img';


const ManajemenBeasiswa = () => {

  const [beasiswaList, setBeasiswaList] = useState([
          { id: 1, nama: 'GenBI', logo: {LogoGenbi} },
          { id: 2, nama: 'KIP Kuliah', logo: {} }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newBeasiswa, setNewBeasiswa] = useState({ nama: '', logo: '' });

  const handleAddBeasiswa = () => {
    setBeasiswaList([...beasiswaList, { id: Date.now(), ...newBeasiswa }]);
    setShowModal(false);
    setNewBeasiswa({ nama: '', logo: '' });
  };

  const handleUpdate = (id) => {
    alert(`Update beasiswa dengan ID: ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah yakin ingin menghapus beasiswa ini?')) {
      setBeasiswaList(beasiswaList.filter(b => b.id !== id));
    }
  };

  const handleDetail = (id) => {
    alert(`Lihat detail beasiswa dengan ID: ${id}`);
  };

  return (
    <AdminLayout>
      <div className="container mt-4">
        <h3>Daftar Beasiswa</h3>
        <Link to="/bidang/informasi-beasiswa/add" className="mb-3" >Tambahkan Beasiswa +</Link>

        {beasiswaList.map((beasiswa) => (
            <BeasiswaItem
            key={beasiswa.id}
            beasiswa={beasiswa}
            onUpdate={() => handleUpdate(beasiswa.id)}
            onDelete={() => handleDelete(beasiswa.id)}
            onDetail={() => handleDetail(beasiswa.id)}
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
                    value={newBeasiswa.nama}
                    onChange={(e) => setNewBeasiswa({ ...newBeasiswa, nama: e.target.value })}
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
