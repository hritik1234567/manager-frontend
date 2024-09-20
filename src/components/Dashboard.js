import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap'; // Using react-bootstrap for modal
import Navbar from './Navbar';
function Dashboard() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState(null); // To store the metric to be updated
  const [formValues, setFormValues] = useState({
    date: '',
    temperature: '',
    bloodPressure: '',
    heartRate: '',
  });

  // Fetch data on component mount
  /*useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken'); 
        const response = await axios.get('http://localhost:8000/api/metric/get-data', {
          headers: { authorization: `${token}` }
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [showModal]);*/
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:8000/api/metric/get-data', {
        headers: { authorization: `${token}` },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
 

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handle delete functionality
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/metric/delete-data/${id}`);
      setData(data.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting data', error);
    }
  };

  // Handle update button click to open modal
  const handleUpdate = (metric) => {
    setSelectedMetric(metric);
    setFormValues({
        date: metric.date ? new Date(metric.date).toISOString().slice(0, 10) : '',
        // ISO format for date input
      temperature: metric.temperature,
      bloodPressure: metric.bloodPressure,
      heartRate: metric.heartRate,
    });
    setShowModal(true);
  };

  // Handle form submission for updating
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    try {
      const updatedMetric = {
        date: formValues.date,
        temperature: formValues.temperature,
        bloodPressure: formValues.bloodPressure,
        heartRate: formValues.heartRate,
      };

      await axios.put(`http://localhost:8000/api/metric/update-data/${selectedMetric._id}`, updatedMetric, {
        headers: { authorization: `${token}` },
      });

      // Update the local data state
      setData((prevData) =>
        prevData.map((item) =>
          item._id === selectedMetric._id ? { ...item, ...updatedMetric } : item
        )
      );

      // Close modal and reset state
      setShowModal(false);
      setSelectedMetric(null);
    } catch (error) {
      console.error('Error updating data', error);
    }
  };
 

  return (
    <>
    <Navbar refreshData={fetchData} />
    <div className="container mt-4">
      <h2>Dashboard</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temperature</th>
            <th>Blood Pressure</th>
            <th>Heart Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{new Date(item.date).toLocaleDateString()}</td>
              <td>{item.temperature}</td>
              <td>{item.bloodPressure}</td>
              <td>{item.heartRate}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleUpdate(item)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      {showModal && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Health Metric</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formValues.date}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="temperature" className="mt-3">
                <Form.Label>Temperature</Form.Label>
                <Form.Control
                  type="text"
                  name="temperature"
                  value={formValues.temperature}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="bloodPressure" className="mt-3">
                <Form.Label>Blood Pressure</Form.Label>
                <Form.Control
                  type="text"
                  name="bloodPressure"
                  value={formValues.bloodPressure}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="heartRate" className="mt-3">
                <Form.Label>Heart Rate</Form.Label>
                <Form.Control
                  type="number"
                  name="heartRate"
                  value={formValues.heartRate}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                Update Metric
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
    </>
  );
}

export default Dashboard;

