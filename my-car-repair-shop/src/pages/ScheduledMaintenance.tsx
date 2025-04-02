import React from 'react';
import Sidebar from '../components/Sidebar';
import './ScheduledMaintenance.css';

const ScheduledMaintenance: React.FC = () => {
  // This would eventually come from server
  const serviceOrders = [
    {
      id: 1,
      make: 'Toyota',
      model: 'Camry',
      year: 2019,
      customer: 'Emily Johnson',
      phone: '(555) 123-4567',
      requestDate: '2025-04-01',
      priority: 'standard',
      services: [
        { 
          id: 101, 
          name: 'Oil Change', 
          notes: 'Synthetic oil preferred'
        },
        { 
          id: 102, 
          name: 'Brake Inspection', 
          notes: 'Squeaking when braking'
        }
      ]
    },
    {
      id: 2,
      make: 'Honda',
      model: 'CR-V',
      year: 2020,
      customer: 'Robert Chen',
      phone: '(555) 987-6543',
      requestDate: '2025-04-01',
      priority: 'urgent',
      services: [
        { 
          id: 103, 
          name: 'Tire Rotation', 
          notes: 'Uneven wear on front tires'
        },
        { 
          id: 104, 
          name: 'Air Filter Replacement', 
          notes: 'Engine seems to be working harder than usual'
        }
      ]
    },
    {
      id: 3,
      make: 'Ford',
      model: 'F-150',
      year: 2018,
      customer: 'Sarah Martinez',
      phone: '(555) 765-4321',
      requestDate: '2025-03-31',
      priority: 'standard',
      services: [
        { 
          id: 105, 
          name: 'Transmission Flush', 
          notes: 'Shifting feels rough'
        },
        { 
          id: 106, 
          name: 'Battery Replacement', 
          notes: 'Car struggles to start in the morning'
        }
      ]
    },
    {
      id: 4,
      make: 'BMW',
      model: 'X5',
      year: 2021,
      customer: 'Michael Thompson',
      phone: '(555) 234-5678',
      requestDate: '2025-03-30',
      priority: 'urgent',
      services: [
        { 
          id: 107, 
          name: 'Diagnostic Scan', 
          notes: 'Check engine light is on'
        },
        { 
          id: 108, 
          name: 'Coolant Flush', 
          notes: 'Temperature gauge reading high'
        }
      ]
    }
  ];

  const getPriorityClass = (priority: string) => {
    return priority === 'urgent' ? 'priority-urgent' : 'priority-standard';
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <h1>Scheduled Maintenance</h1>
        <p>Review and assign new maintenance requests from customers</p>
        
        <div className="service-orders-grid">
          {serviceOrders.map(order => (
            <div key={order.id} className="order-card">
              <div className="vehicle-header">
                <div>{order.make}</div>
                <div className="vehicle-model">{order.model}</div>
              </div>
              
              <div className="order-content">
                <div className="vehicle-info">
                  <div className="customer-info">{order.customer}</div>
                  <div className="vehicle-year">{order.year}</div>
                </div>
                
                <div>
                  <span className={`order-priority ${getPriorityClass(order.priority)}`}>
                    {order.priority === 'urgent' ? 'Urgent' : 'Standard'}
                  </span>
                  <div className="request-date">Requested: {formatDate(order.requestDate)}</div>
                </div>
                
                <ul className="requested-services">
                  {order.services.map(service => (
                    <li key={service.id} className="service-item">
                      <div className="service-name">{service.name}</div>
                      <div className="service-details">
                        <div>{service.notes}</div>
                      </div>
                    </li>
                  ))}
                </ul>
                
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