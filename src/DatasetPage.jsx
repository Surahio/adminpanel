import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import "./style.css";
import { Container } from '@mantine/core';
import Sidebar from "./Sidebar.jsx";
import "./home.css";

const dummyData = [
  {
    id: 1,
    name: "Sales Data",
    dateCreated: "2022-04-01",
    size: "1 MB",
    createdBy: "John Doe",
    ownerName: "John Doe",
    ownerEmail: "john.doe@example.com",
  },
  {
    id: 2,
    name: "Customer Data",
    dateCreated: "2022-05-01",
    size: "2 MB",
    createdBy: "Jane Smith",
    ownerName: "Jane Smith",
    ownerEmail: "jane.smith@example.com",
  },
];

const DatasetPage = () => {
  const [datasets, setDatasets] = useState(dummyData);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [showOwnershipModal, setShowOwnershipModal] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [newOwnerName, setNewOwnerName] = useState("");
  const [newOwnerEmail, setNewOwnerEmail] = useState("");

  const handleCopy = (dataset) => {
    console.log(`Copy dataset ${dataset.name}`);
  };

  const handleOwnershipChange = (event) => {
    event.preventDefault();
    console.log(
      `Change ownership of dataset ${selectedDataset.name} to ${newOwnerName} (${newOwnerEmail})`
    );
  };

  return (
    <>
    <div className="container-new">
          <Sidebar/>
          <div className="others">
          <div className="row">
          <a href="" target="_blank">
              <img src="/Logo_Ezhire.svg" className="logo tauri" alt="Tauri logo" />
          </a>
      </div>
      <Container className='table-container'>
      <div>
              <Table>
                  <thead>
                      <tr>
                          <th>Name</th>
                          <th>Date Created</th>
                          <th>Size</th>
                          <th>Created By</th>
                          <th>Actions</th>
                      </tr>
                  </thead>
                  {datasets.map((dataset) => (
                      <tr key={dataset.id}>
                          <th>{dataset.name}</th>
                          <th>{dataset.dateCreated}</th>
                          <th>{dataset.size}</th>
                          <th>{dataset.createdBy}</th>
                          <th>
                              <Button
                                  onClick={() => {
                                      setSelectedDataset(dataset);
                                      setShowCopyModal(true);
                                  } }
                              >
                                  Copy
                              </Button>
                              <Button
                                  onClick={() => {
                                      setSelectedDataset(dataset);
                                      setShowOwnershipModal(true);
                                  } }
                              >
                                  Change Ownership
                              </Button>
                          </th>
                      </tr>
                  ))}
              </Table>

              <Modal show={showCopyModal} onHide={() => setShowCopyModal(false)}>
                  <Modal.Header closeButton>
                      <Modal.Title>Copy Dataset</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      <p>
                          Do you want to copy dataset "
                          {selectedDataset ? selectedDataset.name : ""}"?
                      </p>
                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={() => setShowCopyModal(false)}>
                          Cancel
                      </Button>
                      <Button
                          variant="primary"
                          onClick={() => {
                              handleCopy(selectedDataset);
                          } }
                      >
                          Copy
                      </Button>
                  </Modal.Footer>
              </Modal>

              <Modal
                  show={showOwnershipModal}
                  onHide={() => setShowOwnershipModal(false)}
              >
                  <Modal.Header closeButton>
                      <Modal.Title>Change Ownership</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      <Form onSubmit={handleOwnershipChange}>
                          <Form.Group controlId="newOwnerName">
                              <Form.Label>New Owner Name:</Form.Label>
                              <Form.Control
                                  type="text"
                                  value={newOwnerName}
                                  onChange={(e) => setNewOwnerName(e.target.value)} />
                          </Form.Group>
                          <Form.Group controlId="newOwnerEmail">
                              <Form.Label>New Owner Email:</Form.Label>
                              <Form.Control
                                  type="email"
                                  value={newOwnerEmail}
                                  onChange={(e) => setNewOwnerEmail(e.target.value)} />
                          </Form.Group>
                          <Button variant="primary" type="submit">
                              Change Ownership
                          </Button>
                      </Form>
                  </Modal.Body>
                  <Modal.Footer>
                      <Button
                          variant="secondary"
                          onClick={() => setShowOwnershipModal(false)}
                      >
                          Cancel
                      </Button>
                  </Modal.Footer>
              </Modal>
          </div>
          </Container>
          </div>
        </div>
    </>
  );
};

export default DatasetPage;
