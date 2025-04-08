import React from 'react';
import Sidebar from '../components/Sidebar';
import './CurrentMaintenance.css';

const CurrentMaintenance: React.FC = () => {
  const currentOrders = [
    { id:1, make:'Toyota', model:'Camry', year:2019, customer:'Emily Johnson', requestDate:'2025-04-01',
      startedDate:'2025-04-02', technician:'Mike Anderson', billTotal:245.75, progress:60, services:[
        { id:101, name:'Oil Change', notes:'Synthetic oil preferred'},
        { id:102, name:'Brake Inspection', notes:'Squeaking when braking'}
    ]},
    { id:2, make:'Honda', model:'CR-V', year:2020, customer:'Robert Chen', requestDate:'2025-04-01',
      startedDate:'2025-04-03', technician:'Sarah Wilson', billTotal:180.50, progress:30, services:[
        { id:103, name:'Tire Rotation', notes:'Uneven wear on front tires'},
        { id:104, name:'Air Filter Replacement', notes:'Engine seems to be working harder'}
    ]},
    { id:3, make:'Ford', model:'F-150', year:2018, customer:'Sarah Martinez', requestDate:'2025-03-31',
      startedDate:'2025-04-01', technician:'James Lee', billTotal:420, progress:100, services:[
        { id:105, name:'Transmission Flush', notes:'Shifting feels rough'},
        { id:106, name:'Battery Replacement', notes:'Car struggles to start'}
    ]}
  ];

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', 
    { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <h1>Current Maintenance</h1>
        <p>View the ongoing maintenance tasks in real-time.</p>
        
        <div className="service-orders-grid">
          {currentOrders.map(order => (
            <div key={order.id} className="order-card">
              <div className="vehicle-header">
                <div className="make">{order.make}</div>
                <div className="vehicle-model">{order.model}</div>
                <div className="cancel-button" title="Cancel Order">×</div>
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
                  <div><span className="label">Started:</span>{formatDate(order.startedDate)}</div>
                </div>
                
                <ul className="requested-services">
                  {order.services.map(s => (
                    <li key={s.id} className="service-item">
                      <div className="service-name">{s.name}</div>
                      <div className="service-details">{s.notes}</div>
                    </li>
                  ))}
                </ul>
                
                <div className="order-actions">
                  <button className="action-button update-button">Update Order</button>
                  <button className="action-button complete-button">Mark Complete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentMaintenance;