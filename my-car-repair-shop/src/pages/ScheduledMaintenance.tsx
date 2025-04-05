import React from 'react';
import Sidebar from '../components/Sidebar';
import './ScheduledMaintenance.css';

const ScheduledMaintenance: React.FC = () => {
  const serviceOrders = [
    { id:1, make:'Toyota', model:'Camry', year:2019, customer:'Emily Johnson',
      requestDate:'2025-04-01', estimatedCost:189.99, services:[
        { id:101, name:'Oil Change', notes:'Synthetic oil preferred' },
        { id:102, name:'Brake Inspection', notes:'Squeaking when braking' }
    ]},
    { id:2, make:'Honda', model:'CR-V', year:2020, customer:'Robert Chen',
      requestDate:'2025-04-01', estimatedCost:159.50, services:[
        { id:103, name:'Tire Rotation', notes:'Uneven wear on front tires' },
        { id:104, name:'Air Filter Replacement', notes:'Engine working harder' }
    ]},
    { id:3, make:'Ford', model:'F-150', year:2018, customer:'Sarah Martinez',
      requestDate:'2025-03-31', estimatedCost:349.95, services:[
        { id:105, name:'Transmission Flush', notes:'Shifting feels rough' },
        { id:106, name:'Battery Replacement', notes:'Struggles to start' }
    ]},
  ];

  const formatDate = (d: string) => 
    new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const formatCurrency = (n: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <h1>Scheduled Maintenance</h1>
        <p>Review and assign new maintenance requests</p>
        
        <div className="service-orders-grid">
          {serviceOrders.map(order => (
            <div key={order.id} className="order-card">
              <div className="vehicle-header">
                <div>{order.make}</div>
                <div className="vehicle-model">{order.model}</div>
                <div className="cancel-button" onClick={() => console.log(`Cancel ${order.id}`)}>
                  <span className="cancel-icon">×</span>
                </div>
              </div>
              
              <div className="order-content">
                <div className="vehicle-info">
                  <div>{order.customer}</div>
                  <div>{order.year}</div>
                </div>
                
                <div>Requested: {formatDate(order.requestDate)}</div>
                
                <ul className="requested-services">
                  {order.services.map(s => (
                    <li key={s.id} className="service-item">
                      <div className="service-name">{s.name}</div>
                      <div>{s.notes}</div>
                    </li>
                  ))}
                </ul>
                
                <div className="estimated-cost">
                  Estimated Total: <span>{formatCurrency(order.estimatedCost)}</span>
                </div>
                
                <div className="order-actions">
                  <button className="action-button assign-button">Assign Technician</button>
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

export default ScheduledMaintenance;