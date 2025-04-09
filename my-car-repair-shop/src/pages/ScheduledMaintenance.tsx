import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { retrieveScheduledMaintenance, assignTechnician, cancelServiceOrder, ServiceOrder } from '../api/orderAPI';
import './ScheduledMaintenance.css';

const ScheduledMaintenance: React.FC = () => {
  const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadScheduledMaintenance = async () => {
      try {
        setLoading(true);
        const orders = await retrieveScheduledMaintenance();
        setServiceOrders(orders);
        setError(null);
      } catch (err) {
        console.error('Error loading scheduled maintenance:', err);
        setError('Failed to load scheduled maintenance');
      } finally {
        setLoading(false);
      }
    };

    loadScheduledMaintenance();
  }, []);

  const handleCancelOrder = async (orderId: number) => {
    if (!window.confirm('Are you sure you want to cancel this service order?')) {
      return;
    }

    try {
      await cancelServiceOrder(orderId);
      // Remove the canceled order from the list
      setServiceOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    } catch (err) {
      console.error('Error canceling service order:', err);
      setError('Failed to cancel service order');
    }
  };

  const handleAssignTechnician = async (orderId: number) => {
    
    const technicianId = 1; 
    
    try {
      const updatedOrder = await assignTechnician(orderId, technicianId);
      
      // Update the order in the list
      setServiceOrders(prevOrders => 
        prevOrders.map(order => order.id === orderId ? updatedOrder : order)
      );
      
      alert('Technician assigned successfully!');
    } catch (err) {
      console.error('Error assigning technician:', err);
      setError('Failed to assign technician');
    }
  };

  const formatDate = (d: string) => 
    new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const formatCurrency = (n: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

  if (loading) {
    return (
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <h1>Scheduled Maintenance</h1>
          <p>Loading scheduled maintenance...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <h1>Scheduled Maintenance</h1>
        <p>Review and assign new maintenance requests</p>
        
        {error && <div className="error-message">{error}</div>}
        
        {serviceOrders.length === 0 ? (
          <p>No maintenance requests found.</p>
        ) : (
          <div className="service-orders-grid">
            {serviceOrders.map(order => (
              <div key={order.id} className="order-card">
                <div className="vehicle-header">
                  <div>{order.make}</div>
                  <div className="vehicle-model">{order.model}</div>
                  <div 
                    className="cancel-button" 
                    onClick={() => handleCancelOrder(order.id)}
                  >
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
                    <button 
                      className="action-button assign-button"
                      onClick={() => handleAssignTechnician(order.id)}
                    >
                      Assign Technician
                    </button>
                    <button 
                      className="action-button details-button"
                      onClick={() => window.location.href = `/maintenance/${order.id}`}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduledMaintenance;