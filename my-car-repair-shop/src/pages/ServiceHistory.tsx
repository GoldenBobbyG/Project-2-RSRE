import React, { useState } from 'react';
import Sidebar from '../components/CustSidebar';
import './ServiceHistory.css';

const ServiceHistory: React.FC = () => {
  const [filters, setFilters] = useState({ vehicle: 'all', status: 'all', year: 'all' });
  
  const serviceHistory = [
    {
      id: 101,
      make: 'Toyota',
      model: 'Camry',
      year: 2019,
      serviceDate: '2025-03-15',
      completionDate: '2025-03-15',
      status: 'completed' as const,
      services: [
        { id: 1001, name: 'Oil Change', details: 'Full synthetic oil change', price: 59.99, technicianName: 'Alex Johnson' },
        { id: 1002, name: 'Tire Rotation', details: 'Wheel balancing', price: 29.99, technicianName: 'Alex Johnson' }
      ],
      totalCost: 89.98,
      warrantyEnd: '2025-09-15',
      invoiceNumber: 'INV-10584',
      technicianName: 'Alex Johnson'
    },
    {
      id: 102,
      make: 'Honda',
      model: 'Accord',
      year: 2020,
      serviceDate: '2025-03-30',
      completionDate: null,
      status: 'in-progress' as const,
      services: [
        { id: 1005, name: 'Engine Diagnosis', details: 'Check engine light', price: 89.99, technicianName: 'James Wilson' }
      ],
      totalCost: 89.99,
      warrantyEnd: null,
      invoiceNumber: 'INV-10612',
      technicianName: 'James Wilson'
    }
  ];

  const filtered = serviceHistory.filter(r => 
    (filters.vehicle === 'all' || `${r.make} ${r.model}` === filters.vehicle) &&
    (filters.status === 'all' || r.status === filters.status) &&
    (filters.year === 'all' || r.year.toString() === filters.year)
  );

  const statusLookup = {
    completed: { label: 'Completed', class: 'status-completed' },
    'in-progress': { label: 'In Progress', class: 'status-in-progress' },
    scheduled: { label: 'Scheduled', class: 'status-scheduled' }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <h1>Service History</h1>
        
        <div className="filters">
          {['vehicle', 'status', 'year'].map((filter) => (
            <select key={filter} className="filter" 
              value={filters[filter as keyof typeof filters]}
              onChange={e => setFilters({...filters, [filter]: e.target.value})}
            >
              <option value="all">All {filter === 'year' ? 'Years' : filter === 'vehicle' ? 'Vehicles' : 'Statuses'}</option>
              {filter === 'status' ? ['completed','in-progress','scheduled'].map(o => 
                <option key={o} value={o}>{o}</option>
              ) : Array.from(new Set(serviceHistory.map(r => 
                filter === 'vehicle' ? `${r.make} ${r.model}` : r.year.toString()
              ))).map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          ))}
        </div>

        <div className="grid">
          {filtered.map(r => {
            const status = statusLookup[r.status];
            return (
              <div key={r.id} className="card">
                <div className="header">
                  <div>{r.make} <span>{r.model}</span></div>
                  <div className={status.class}>{status.label}</div>
                </div>
                
                <div className="content">
                  <div className="date-info">
                    <div>
                      {r.status === 'completed' ? `Completed: ${new Date(r.completionDate!).toLocaleDateString()}` :
                      `Started: ${new Date(r.serviceDate).toLocaleDateString()}`}
                    </div>
                    <div>{r.year}</div>
                  </div>
                  
                  <ul>
                    {r.services.map(s => (
                      <li key={s.id}>
                        <div>
                          {s.name}
                          <span>${s.price.toFixed(2)}</span>
                        </div>
                        <div>{s.details}</div>
                        {(r.status === 'completed' || r.status === 'in-progress') && 
                          <div>Technician: <span>{s.technicianName}</span></div>
                        }
                      </li>
                    ))}
                  </ul>
                  
                  <div className="total">
                    Total: <span>${r.totalCost.toFixed(2)}</span>
                  </div>
                  
                  <div className="actions">
                    {r.status === 'completed' && (
                      <button onClick={() => console.log(`View invoice ${r.invoiceNumber}`)}>
                        View Invoice
                      </button>
                    )}
                    <button onClick={() => console.log('Schedule service')}>
                      {r.status === 'completed' ? 'Schedule Similar' : 'Modify Appointment'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServiceHistory;