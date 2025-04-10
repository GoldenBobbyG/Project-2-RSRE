import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import './ScheduledMaintenance.css';
import axios from 'axios';
import { PartData, OrderData } from '../interfaces/types';

const ScheduledMaintenance: React.FC = () => {
  const [serviceOrders, setServiceOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        const orders: OrderData[] = response.data.map((order: any) => ({
          id: order.id,
          service_name: order.service_name,
          price: order.price,
          service_date: new Date(order.service_date).toISOString(),
          user_id: order.user_id,
          employee_id: order.employee_id,
          parts: order.parts.map((part: PartData) => ({
            id: part.id,
            part_number: part.part_number,
            price: part.price,
            title: part.title,
            description: part.description
          }))
        }));

        setServiceOrders(orders);
        setError(null);
      } catch (err) {
        setError('Failed to load service orders');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);  // Only fetch orders when the component mounts

  const handleCancel = async (orderId: number) => {
    try {
      await axios.delete(`/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setServiceOrders(prev => prev.filter(order => order.id !== orderId));
    } catch (err) {
      alert('Failed to cancel order');
      console.error('Cancel error:', err);
    }
  };

  const formatDate = (isoString: string) => 
    new Date(isoString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD' 
    }).format(amount);

  if (loading) return <div className="loading">Loading service orders...</div>;
  if (error) return <div className="error">{error}</div>;

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
                <div>{order.service_name}</div>
                <div className="cancel-button" onClick={() => handleCancel(order.id)}>
                  <span className="cancel-icon">×</span>
                </div>
              </div>
              
              <div className="order-content">
                <div className="meta-info">
                  <div>Requested by: User #{order.user_id}</div>
                  <div>Assigned to: {order.employee_id ? `Tech #${order.employee_id}` : 'Unassigned'}</div>
                </div>
                
                <div>Requested: {formatDate(order.service_date)}</div>
                
                <ul className="requested-parts">
                  {order.parts.map(part => (
                    <li key={part.id} className="part-item">
                      <div className="part-title">{part.title}</div>
                      <div>{part.description}</div>
                      <div className="part-price">{formatCurrency(part.price)}</div>
                    </li>
                  ))}
                </ul>
                
                <div className="total-cost">
                  Total Estimate: <span>{formatCurrency(order.price)}</span>
                </div>
                
                <div className="order-actions">
                  <button className="action-button assign-button">
                    {order.employee_id ? 'Reassign' : 'Assign'} Technician
                  </button>
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
