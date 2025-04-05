import React from 'react';
import Sidebar from '../components/Sidebar';
import './Records.css';

const Records: React.FC = () => {
  const completedOrders = [
    { 
      id: 1, 
      make: 'Toyota', 
      model: 'Camry', 
      year: 2019, 
      customer: 'Emily Johnson', 
      requestDate: '2025-03-25',
      completedDate: '2025-03-28', 
      technician: 'Mike Anderson', 
      billTotal: 320.50, 
      services: [
        { id: 101, name: 'Oil Change', notes: 'Full synthetic oil' },
        { id: 102, name: 'Brake Pad Replacement', notes: 'Ceramic pads installed' }
      ] 
    },
    { 
      id: 2, 
      make: 'Honda', 
      model: 'Civic', 
      year: 2021, 
      customer: 'David Miller', 
      requestDate: '2025-03-20',
      completedDate: '2025-03-22', 
      technician: 'Sarah Wilson', 
      billTotal: 275.00, 
      services: [
        { id: 103, name: 'Tire Rotation', notes: 'Including wheel balancing' },
        { id: 104, name: 'AC Recharge', notes: 'With leak detection' }
      ] 
    },
    { 
      id: 3, 
      make: 'Ford', 
      model: 'Explorer', 
      year: 2020, 
      customer: 'Jessica Brown', 
      requestDate: '2025-03-18',
      completedDate: '2025-03-21', 
      technician: 'James Lee', 
      billTotal: 450.75, 
      services: [
        { id: 105, name: 'Transmission Service', notes: 'Full flush and filter' },
        { id: 106, name: 'Spark Plug Replacement', notes: 'Iridium plugs installed' }
      ] 
    }
  ];

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', 
    { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <h1>Maintenance Records</h1>
        <p>Historical record of completed maintenance operations.</p>
        
        <div className="service-orders-grid">
          {completedOrders.map(order => (
            <div key={order.id} className="order-card">
              <div className="vehicle-header">
                <div className="make">{order.make}</div>
                <div className="vehicle-model">{order.model}</div>
                <div className="completed-badge" title="Completed">✓</div>
              </div>
              
              <div className="order-content">
                <div className="vehicle-info">
                  <div>{order.customer}</div>
                  <div className="vehicle-year">{order.year}</div>
                </div>
                
                <div className="technician-bill">
                  <div><span className="label">Technician:</span>{order.technician}</div>
                  <div><span className="label">Total:</span>${order.billTotal.toFixed(2)}</div>
                </div>

                <div className="timing-info">
                  <div><span className="label">Requested:</span>{formatDate(order.requestDate)}</div>
                  <div><span className="label">Completed:</span>{formatDate(order.completedDate)}</div>
                </div>
                
                <ul className="requested-services">
                  {order.services.map(service => (
                    <li key={service.id} className="service-item">
                      <div className="service-name">{service.name}</div>
                      <div className="service-details">{service.notes}</div>
                    </li>
                  ))}
                </ul>
                
                <div className="order-actions">
                  <button className="action-button invoice-button">Generate Invoice</button>
                  <button className="action-button details-button">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Records;