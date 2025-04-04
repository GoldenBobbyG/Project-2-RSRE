import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './ServiceHistory.css';

interface ServiceItem {
  id: number;
  name: string;
  details: string;
  price: number;
  technicianName: string;
}

interface ServiceRecord {
  id: number;
  make: string;
  model: string;
  year: number;
  serviceDate: string;
  completionDate: string | null;
  status: 'completed' | 'in-progress' | 'scheduled';
  services: ServiceItem[];
  totalCost: number;
  warrantyEnd: string | null;
  invoiceNumber: string;
  technicianName: string;
}

const ServiceHistory: React.FC = () => {
  // Filter states
  const [vehicleFilter, setVehicleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');
  
  // This would eventually come from server - sample data
  const serviceHistory: ServiceRecord[] = [
    {
      id: 101,
      make: 'Toyota',
      model: 'Camry',
      year: 2019,
      serviceDate: '2025-03-15',
      completionDate: '2025-03-15',
      status: 'completed',
      services: [
        { 
          id: 1001, 
          name: 'Oil Change', 
          details: 'Full synthetic oil change with filter replacement',
          price: 59.99,
          technicianName: 'Alex Johnson'
        },
        { 
          id: 1002, 
          name: 'Tire Rotation', 
          details: 'Rotated tires and balanced wheels',
          price: 29.99,
          technicianName: 'Alex Johnson'
        }
      ],
      totalCost: 89.98,
      warrantyEnd: '2025-09-15',
      invoiceNumber: 'INV-10584',
      technicianName: 'Alex Johnson'
    },
    {
      id: 102,
      make: 'Toyota',
      model: 'Camry',
      year: 2019,
      serviceDate: '2025-01-22',
      completionDate: '2025-01-23',
      status: 'completed',
      services: [
        { 
          id: 1003, 
          name: 'Brake Replacement', 
          details: 'Front brake pads and rotors replaced',
          price: 329.99,
          technicianName: 'Maria Rodriguez'
        },
        { 
          id: 1004, 
          name: 'Brake Fluid Flush', 
          details: 'Complete brake system fluid replacement',
          price: 79.99,
          technicianName: 'Maria Rodriguez'
        }
      ],
      totalCost: 409.98,
      warrantyEnd: '2026-01-22',
      invoiceNumber: 'INV-10273',
      technicianName: 'Maria Rodriguez'
    },
    {
      id: 103,
      make: 'Honda',
      model: 'Accord',
      year: 2020,
      serviceDate: '2025-03-30',
      completionDate: null,
      status: 'in-progress',
      services: [
        { 
          id: 1005, 
          name: 'Check Engine Light Diagnosis', 
          details: 'Diagnostic testing to identify engine issue',
          price: 89.99,
          technicianName: 'James Wilson'
        },
        { 
          id: 1006, 
          name: 'Fuel Injector Cleaning', 
          details: 'Clean and service fuel injectors',
          price: 119.99,
          technicianName: 'James Wilson'
        }
      ],
      totalCost: 209.98,
      warrantyEnd: null,
      invoiceNumber: 'INV-10612',
      technicianName: 'James Wilson'
    },
    {
      id: 104,
      make: 'Honda',
      model: 'Accord',
      year: 2020,
      serviceDate: '2025-04-15',
      completionDate: null,
      status: 'scheduled',
      services: [
        { 
          id: 1007, 
          name: '30,000 Mile Service', 
          details: 'Comprehensive maintenance package',
          price: 349.99,
          technicianName: 'Not assigned'
        }
      ],
      totalCost: 349.99,
      warrantyEnd: null,
      invoiceNumber: 'Not issued',
      technicianName: 'Not assigned'
    }
  ];

  // Format date in a user-friendly way
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Filter service history records
  const filteredHistory = serviceHistory.filter(record => {
    if (vehicleFilter !== 'all' && `${record.make} ${record.model}` !== vehicleFilter) return false;
    if (statusFilter !== 'all' && record.status !== statusFilter) return false;
    if (yearFilter !== 'all' && record.year.toString() !== yearFilter) return false;
    return true;
  });

  // Get unique vehicle options for filter
  const vehicleOptions = Array.from(
    new Set(serviceHistory.map(record => `${record.make} ${record.model}`))
  );
  
  // Get unique years for filter
  const yearOptions = Array.from(
    new Set(serviceHistory.map(record => record.year.toString()))
  );

  // Get status label and class
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'completed':
        return { label: 'Completed', className: 'status-completed' };
      case 'in-progress':
        return { label: 'In Progress', className: 'status-in-progress' };
      case 'scheduled':
        return { label: 'Scheduled', className: 'status-scheduled' };
      default:
        return { label: status, className: '' };
    }
  };

  // Check if warranty is active
  const isWarrantyActive = (warrantyEnd: string | null) => {
    if (!warrantyEnd) return false;
    return new Date(warrantyEnd) > new Date();
  };
  
  // Handle action button clicks
  const handleViewInvoice = (invoiceNumber: string) => {
    console.log(`View invoice ${invoiceNumber}`);
    // Would open invoice in real implementation
  };
  
  const handleScheduleService = () => {
    console.log('Schedule new service');
    // Would navigate to schedule service page in real implementation
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <h1>Service History</h1>
        <p>View your vehicle maintenance and repair history</p>
        
        <div className="service-history-filters">
          <select 
            className="filter-dropdown"
            value={vehicleFilter}
            onChange={(e) => setVehicleFilter(e.target.value)}
          >
            <option value="all">All Vehicles</option>
            {vehicleOptions.map(vehicle => (
              <option key={vehicle} value={vehicle}>{vehicle}</option>
            ))}
          </select>
          
          <select 
            className="filter-dropdown"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="scheduled">Scheduled</option>
          </select>
          
          <select 
            className="filter-dropdown"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          >
            <option value="all">All Years</option>
            {yearOptions.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        
        {filteredHistory.length === 0 ? (
          <div className="empty-history">
            <h3>No Service History Found</h3>
            <p>You don't have any service records matching your filters.</p>
            <button className="add-vehicle-btn" onClick={handleScheduleService}>
              Schedule a Service
            </button>
          </div>
        ) : (
          <div className="service-history-grid">
            {filteredHistory.map(record => {
              const statusInfo = getStatusInfo(record.status);
              return (
                <div key={record.id} className="history-card">
                  <div className="vehicle-header">
                    <div>{record.make}</div>
                    <div className="vehicle-model">{record.model}</div>
                    <div className={`service-status ${statusInfo.className}`}>
                      {statusInfo.label}
                    </div>
                  </div>
                  
                  <div className="history-content">
                    <div className="service-date-info">
                      <div className="service-date">
                        {record.status === 'completed' 
                          ? `Completed: ${formatDate(record.completionDate!)}` 
                          : record.status === 'scheduled' 
                            ? `Scheduled: ${formatDate(record.serviceDate)}`
                            : `Started: ${formatDate(record.serviceDate)}`}
                      </div>
                      <div className="vehicle-year">{record.year}</div>
                    </div>
                    
                    <ul className="completed-services">
                      {record.services.map(service => (
                        <li key={service.id} className="service-item">
                          <div className="service-name">
                            {service.name}
                            <span className="service-price">{formatCurrency(service.price)}</span>
                          </div>
                          <div className="service-details">
                            {service.details}
                          </div>
                          {record.status !== 'scheduled' && (
                            <div className="technician-info">
                              <div>
                                Technician: <span className="tech-name">{service.technicianName}</span>
                              </div>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="service-total">
                      Total: <span>{formatCurrency(record.totalCost)}</span>
                    </div>
                    
                    {record.status === 'completed' && record.warrantyEnd && (
                      <div className="warranty-info">
                        Warranty: {isWarrantyActive(record.warrantyEnd) ? (
                          <span className="warranty-active">
                            Active until {formatDate(record.warrantyEnd)}
                          </span>
                        ) : (
                          <span className="warranty-expired">
                            Expired on {formatDate(record.warrantyEnd)}
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div className="history-actions">
                      {record.status === 'completed' && (
                        <button 
                          className="action-button invoice-button"
                          onClick={() => handleViewInvoice(record.invoiceNumber)}
                        >
                          View Invoice
                        </button>
                      )}
                      <button 
                        className="action-button schedule-button"
                        onClick={handleScheduleService}
                      >
                        {record.status === 'completed' ? 'Schedule Similar Service' : 'Modify Appointment'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceHistory;