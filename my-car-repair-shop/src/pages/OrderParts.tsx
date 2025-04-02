import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './OrderParts.css';

const OrderParts: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [partName, setPartName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  // Mock customer data - would typically come from API
  const customers = [
    { id: '1', name: 'Emily Johnson - 2019 Toyota Camry' },
    { id: '2', name: 'Robert Chen - 2020 Honda CR-V' },
    { id: '3', name: 'Sarah Martinez - 2018 Ford F-150' },
    { id: '4', name: 'Michael Thompson - 2021 BMW X5' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your 3rd party API
    console.log('Order submitted:', {
      customer: selectedCustomer,
      partName,
      quantity,
      notes
    });
    
    // Reset form
    setSelectedCustomer('');
    setPartName('');
    setQuantity(1);
    setNotes('');
    alert('Parts order submitted successfully!');
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <h1>Order Parts</h1>
        <p>Place and manage orders for car parts from this page.</p>

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Select Customer Vehicle</label>
              <select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                required
              >
                <option value="">Choose a customer...</option>
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Part Name/Number</label>
              <input
                type="text"
                value={partName}
                onChange={(e) => setPartName(e.target.value)}
                placeholder="Enter part name or number"
                required
              />
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
                max="100"
                required
              />
            </div>

            <div className="form-group">
              <label>Additional Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Special instructions or part details"
                rows={3}
              />
            </div>

            <button type="submit" className="submit-button">
              Order Parts
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderParts;