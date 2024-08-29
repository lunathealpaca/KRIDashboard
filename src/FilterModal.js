import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { FaSync } from 'react-icons/fa';

export default function FilterModal({
  show,
  onHide,
  filterUser,
  setFilterUser,
  filterStartDate,
  setFilterStartDate,
  filterEndDate,
  setFilterEndDate,
  names,
  onFilter,
  onReset
}) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title className="custom-modal-title">Filter Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="filterUser">
          <Form.Label className="custom-form-label">Filter by User</Form.Label>
          <Form.Control as="select" value={filterUser} onChange={(e) => setFilterUser(e.target.value)}>
            <option value="Any User">Any User</option>
            {names.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="filterStartDate" style={{ marginTop: '10px' }}>
          <Form.Label className="custom-form-label">Start Date</Form.Label>
          <Form.Control type="date" value={filterStartDate} onChange={(e) => setFilterStartDate(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="filterEndDate" style={{ marginTop: '10px' }}>
          <Form.Label className="custom-form-label">End Date</Form.Label>
          <Form.Control type="date" value={filterEndDate} onChange={(e) => setFilterEndDate(e.target.value)} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onReset}>
          <FaSync style={{ marginRight: '5px' }} /> Reset
        </Button>
        <Button variant="primary" onClick={onFilter}>
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
