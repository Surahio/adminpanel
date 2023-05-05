// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, Button, Modal, Form } from 'react-bootstrap';

// const DatasetPage = () => {
//   const [datasets, setDatasets] = useState([]);
//   const [showCopyModal, setShowCopyModal] = useState(false);
//   const [showOwnershipModal, setShowOwnershipModal] = useState(false);
//   const [selectedDataset, setSelectedDataset] = useState(null);
//   const [newOwnerName, setNewOwnerName] = useState('');
//   const [newOwnerEmail, setNewOwnerEmail] = useState('');

//   useEffect(() => {
//     axios.get('/api/datasets')
//       .then(response => setDatasets(response.data))
//       .catch(error => console.log(error));
//   }, []);

//   const handleCopy = dataset => {
//     axios.post('/api/datasets/copy', { datasetId: dataset.id })
//       .then(response => {
//         setDatasets([...datasets, response.data]);
//         setShowCopyModal(false);
//       })
//       .catch(error => console.log(error));
//   };

//   const handleOwnershipChange = event => {
//     event.preventDefault();
//     axios.put(`/api/datasets/${selectedDataset.id}`, {
//       ownerName: newOwnerName,
//       ownerEmail: newOwnerEmail
//     })
//       .then(response => {
//         const updatedDatasets = datasets.map(dataset =>
//           dataset.id === response.data.id ? response.data : dataset
//         );
//         setDatasets(updatedDatasets);
//         setShowOwnershipModal(false);
//       })
//       .catch(error => console.log(error));
//   };

//   return (
//     <div>
//       <Table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Date Created</th>
//             <th>Size</th>
//             <th>Created By</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {datasets.map(dataset => (
//             <tr key={dataset.id}>
//               <td>{dataset.name}</td>
//               <td>{dataset.dateCreated}</td>
//               <td>{dataset.size}</td>
//               <td>{dataset.createdBy}</td>
//               <td>
//                 <Button onClick={() => {
//                   setSelectedDataset(dataset);
//                   setShowCopyModal(true);
//                 }}>Copy</Button>
//                 <Button onClick={() => {
//                   setSelectedDataset(dataset);
//                   setShowOwnershipModal(true);
//                 }}>Change Ownership</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       <Modal show={showCopyModal} onHide={() => setShowCopyModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Copy Dataset</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Are you sure you want to make a copy of the dataset "{selectedDataset && selectedDataset.name}"?</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowCopyModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={() => handleCopy(selectedDataset)}>
//             Copy
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <Modal show={showOwnershipModal} onHide={() => setShowOwnershipModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Change Ownership</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleOwnershipChange}>
//             <Form.Group controlId="newOwnerName">
//               <Form.Label>New Owner Name:</Form.Label>
//               <Form.Control type="text" placeholder="Enter new owner name" value={newOwnerName} onChange={event => setNewOwnerName
