import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import './RequestService.css';

interface ServiceOption {
  id: number;
  name: string;
  description: string;
  estimatedCost: number;
}

const RequestService: React.FC = () => {
  // Vehicle dropdown options
  const [makes, setMakes] = useState<string[]>([
    'Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes-Benz', 'Audi', 'Nissan', 'Hyundai', 'Kia'
  ]);
  const [models, setModels] = useState<string[]>([]);
  const [years, setYears] = useState<number[]>([]);
  
  // Form state
  const [make, setMake] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [details, setDetails] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  
  // Available services
  const serviceOptions: ServiceOption[] = [
    { id: 1, name: 'Oil Change', description: 'Full oil change with filter replacement', estimatedCost: 49.99 },
    { id: 2, name: 'Tire Rotation', description: 'Even out tire wear and improve handling', estimatedCost: 29.99 },
    { id: 3, name: 'Brake Inspection', description: 'Comprehensive check of brake system', estimatedCost: 39.99 },
    { id: 4, name: 'Check Engine Light', description: 'Diagnostic scan and basic troubleshooting', estimatedCost: 59.99 },
    { id: 5, name: 'Battery Service', description: 'Test and inspect battery and charging system', estimatedCost: 24.99 },
    { id: 6, name: 'Air Filter Replacement', description: 'Replace engine air filter', estimatedCost: 19.99 }
  ];

  // Generate years (from current year back 20 years)
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearOptions = [];
    for (let i = 0; i <= 20; i++) {
      yearOptions.push(currentYear - i);
    }
    setYears(yearOptions);
  }, []);

  // Update models based on selected make
  useEffect(() => {
    if (make === 'Toyota') {
      setModels(['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma']);
    } else if (make === 'Honda') {
      setModels(['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey']);
    } else if (make === 'Ford') {
      setModels(['F-150', 'Escape', 'Explorer', 'Mustang', 'Edge']);
    } else if (make === 'Chevrolet') {
      setModels(['Silverado', 'Equinox', 'Malibu', 'Tahoe', 'Traverse']);
    } else if (make === 'BMW') {
      setModels(['3 Series', '5 Series', 'X3', 'X5', '7 Series']);
    } else {
      setModels([]);
    }
  }, [make]);

  // Toggle service selection
  const toggleService = (serviceId: number) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter(id => id !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  // Calculate estimated cost
  const calculateEstimatedCost = () => {
    return serviceOptions
      .filter(service => selectedServices.includes(service.id))
      .reduce((total, service) => total + service.estimatedCost, 0);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      vehicle: { make, model, year },
      customer: { name, email, phone },
      appointment: { date, time },
      services: selectedServices,
      details
    });
    // Would send to API in real implementation
    alert('Service request submitted successfully!');
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <h1>Request Vehicle Service</h1>
        <p>Tell us about your vehicle and the services you need</p>
        
        <form className="request-service-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2 className="form-section-title">Vehicle Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="make">Make</label>
                <select 
                  className="form-control" 
                  id="make" 
                  value={make} 
                  onChange={e => setMake(e.target.value)}
                  required
                >
                  <option value="">Select Make</option>
                  {makes.map(make => (
                    <option key={make} value={make}>{make}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="model">Model</label>
                <select 
                  className="form-control" 
                  id="model" 
                  value={model} 
                  onChange={e => setModel(e.target.value)}
                  required
                  disabled={!make}
                >
                  <option value="">Select Model</option>
                  {models.map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="year">Year</label>
                <select 
                  className="form-control" 
                  id="year" 
                  value={year} 
                  onChange={e => setYear(e.target.value)}
                  required
                >
                  <option value="">Select Year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h2 className="form-section-title">Requested Services</h2>
            <div className="service-options">
              {serviceOptions.map(service => (
                <div 
                  key={service.id} 
                  className={`service-option ${selectedServices.includes(service.id) ? 'selected' : ''}`}
                  onClick={() => toggleService(service.id)}
                >
                  <div className="service-option-header">
                    <input 
                      type="checkbox" 
                      className="service-checkbox" 
                      checked={selectedServices.includes(service.id)} 
                      onChange={() => {}} // Handled by div onClick
                    />
                    <div className="service-name">{service.name}</div>
                  </div>
                  <div className="service-description">{service.description}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="form-section">
            <h2 className="form-section-title">Schedule Appointment</h2>
            <div className="date-time-options">
              <div className="form-group">
                <label className="form-label" htmlFor="date">Preferred Date</label>
                <input 
                  type="date" 
                  className="form-control" 
                  id="date" 
                  value={date} 
                  onChange={e => setDate(e.target.value)}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="time">Preferred Time</label>
                <select 
                  className="form-control" 
                  id="time" 
                  value={time} 
                  onChange={e => setTime(e.target.value)}
                  required
                >
                  <option value="">Select Time</option>
                  <option value="morning">Morning (8:00 AM - 12:00 PM)</option>
                  <option value="afternoon">Afternoon (12:00 PM - 4:00 PM)</option>
                  <option value="evening">Evening (4:00 PM - 7:00 PM)</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h2 className="form-section-title">Contact Information</h2>
            <div className="contact-info">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="name" 
                  value={name} 
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  className="form-control" 
                  id="phone" 
                  value={phone} 
                  onChange={e => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="form-section">
            <h2 className="form-section-title">Additional Details</h2>
            <div className="form-group">
              <label className="form-label" htmlFor="details">Please describe any specific issues or concerns</label>
              <textarea 
                className="form-control form-textarea" 
                id="details" 
                value={details} 
                onChange={e => setDetails(e.target.value)}
                placeholder="Examples: Check engine light is on, strange noise when braking, oil leak, etc."
              ></textarea>
            </div>
          </div>
          
          <div className="estimated-cost">
            Estimated Total: <span>{formatCurrency(calculateEstimatedCost())}</span>
          </div>
          
          <div className="form-actions">
            <button type="button" className="form-button cancel-button">Cancel</button>
            <button type="submit" className="form-button submit-button">Submit Request</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestService;