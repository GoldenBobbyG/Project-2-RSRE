import React from 'react';
import Sidebar from '../components/Sidebar';
import './CurrentMaintenance.css';

const CurrentMaintenance: React.FC = () => {
  // Mock data for current maintenance orders
  const currentOrders = [
    {
      id: 1,
      make: 'Toyota',
      model: 'Camry',
      year: 2019,
      customer: 'Emily Johnson',
      requestDate: '2025-04-01',
      startedDate: '2025-04-02',
      technician: 'Mike Anderson',
      status: 'In Progress',
      progress: 60,
      billTotal: 245.75,
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
      requestDate: '2025-04-01',
      startedDate: '2025-04-03',
      technician: 'Sarah Wilson',
      status: 'In Progress',
      progress: 30,
      billTotal: 180.50,
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
      requestDate: '2025-03-31',
      startedDate: '2025-04-01',
      technician: 'James Lee',
      status: 'Completed',
      progress: 100,
      billTotal: 420.00,
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
    }
  ];

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
                  <div className="customer-info">{order.customer}</div>
                  <div className="vehicle-year">{order.year}</div>
                </div>
                
                <div className="technician-bill">
                  <div className="technician-info">
                    <span className="label">Technician:</span>
                    {order.technician}
                  </div>
                  <div className="bill-total">
                    <span className="label">Total:</span>
                    ${order.billTotal.toFixed(2)}
                  </div>
                </div>

                <div className="timing-info">
                  <div className="request-date">
                    <span className="label">Requested:</span>
                    {formatDate(order.requestDate)}
                  </div>
                  <div className="start-date">
                    <span className="label">Started:</span>
                    {formatDate(order.startedDate)}
                  </div>
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