import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './OrderParts.css';

const OrderParts: React.FC = () => {
  const [form, setForm] = useState({ customer: '', part: '', quantity: 1, notes: '' });
  const customers = [
    { id: '1', name: 'Emily Johnson - 2019 Toyota Camry' },
    { id: '2', name: 'Robert Chen - 2020 Honda CR-V' },
    { id: '3', name: 'Sarah Martinez - 2018 Ford F-150' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Order submitted:', form);
    setForm({ customer: '', part: '', quantity: 1, notes: '' });
    alert('Parts order submitted!');
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
              <select value={form.customer} onChange={e => setForm(f => ({...f, customer: e.target.value}))} required>
                <option value="">Choose a customer...</option>
                {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Part Name/Number</label>
              <input value={form.part} onChange={e => setForm(f => ({...f, part: e.target.value}))} 
                placeholder="Enter part name/number" required />
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input type="number" value={form.quantity} min="1" max="100" required
                onChange={e => setForm(f => ({...f, quantity: +e.target.value}))} />
            </div>

            <div className="form-group">
              <label>Additional Notes</label>
              <textarea value={form.notes} rows={3} placeholder="Special instructions"
                onChange={e => setForm(f => ({...f, notes: e.target.value}))} />
            </div>

            <button type="submit" className="submit-button">Order Parts</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderParts;