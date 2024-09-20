
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function AddMetric({ closeModal, refreshData }) { // Accept refreshData as prop
  const [date, setDate] = useState('');
  const [temperature, setTemperature] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('You must be signed in to add health metrics.');
        return;
      }

      const metricData = { date, temperature, bloodPressure, heartRate };
      await axios.post(
        'http://localhost:8000/api/metric/create-data',
        metricData,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );

      closeModal();
      refreshData(); // Call refreshData to fetch new metrics
    } catch (error) {
      console.error('Error adding health metric:', error);
      setError('Failed to add health metric. Please try again.');
    }
  };

  return (
    <Modal show={true} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Health Metric</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="temperature">
            <Form.Label>Temperature</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., 37.5°C"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="bloodPressure">
            <Form.Label>Blood Pressure</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., 120/80"
              value={bloodPressure}
              onChange={(e) => setBloodPressure(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="heartRate">
            <Form.Label>Heart Rate</Form.Label>
            <Form.Control
              type="number"
              placeholder="e.g., 72 bpm"
              value={heartRate}
              onChange={(e) => setHeartRate(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Add Metric
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddMetric;

