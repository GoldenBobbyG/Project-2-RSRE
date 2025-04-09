import React, { useState, useEffect } from 'react';
import Sidebar from '../components/CustSidebar';
import './RequestService.css';

interface Service { id: number; name: string; description: string; estimatedCost: number; }

const RequestService: React.FC = () => {
  const [form, setForm] = useState({
    make: '', model: '', year: '', name: '', date: '', comments: ''
  });
  const [selected, setSelected] = useState<number[]>([]);
  const [makes] = useState(['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes', 'Audi', 'Nissan', 'Hyundai', 'Kia']);
  const [models, setModels] = useState<string[]>([]);
  const [years] = useState(Array.from({length: 21}, (_, i) => new Date().getFullYear() - i));

  const services: Service[] = [
    {id:1, name:'Oil Change', description:'Full oil change with filter replacement', estimatedCost:49.99},
    {id:2, name:'Tire Rotation', description:'Even out tire wear', estimatedCost:29.99},
    {id:3, name:'Brake Inspection', description:'Brake system check', estimatedCost:39.99},
  ];

  useEffect(() => {
    const modelMap: {[key: string]: string[]} = {
      Toyota: ['Camry','Corolla','RAV4','Highlander','Tacoma'],
      Honda: ['Civic','Accord','CR-V','Pilot','Odyssey'],
      Ford: ['F-150','Escape','Explorer','Mustang','Edge'],
      Chevrolet: ['Silverado','Equinox','Malibu','Tahoe','Traverse'],
      BMW: ['3 Series','5 Series','X3','X5','7 Series']
    };
    setModels(form.make ? modelMap[form.make] || [] : []);
  }, [form.make]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({...form, services: selected});
    alert('Request submitted!');
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <h1>Request Vehicle Service</h1>
        
        <form onSubmit={handleSubmit} className="request-service-form">
          {/* Vehicle Info */}
          <div className="form-section">
            <h2>Vehicle Info</h2>
            <div className="form-row">
              {['make','model','year'].map(field => (
                <div key={field} className="form-group">
                  <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <select
                    value={form[field as keyof typeof form]}
                    onChange={e => setForm({...form, [field]: e.target.value})}
                    disabled={field === 'model' && !form.make}
                    required
                  >
                    <option value="">Select {field}</option>
                    {(field === 'make' ? makes : field === 'model' ? models : years).map(opt =>
                      <option key={opt} value={opt}>{opt}</option>
                    )}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Service Date */}
          <div className="form-section">
            <h2>Service Date</h2>
            <div className="form-group">
              <label>Preferred Date</label>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm({...form, date: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          {/* Services */}
          <div className="form-section">
            <h2>Services</h2>
            <div className="service-options">
              {services.map(s => (
                <div key={s.id} className={`service-option ${selected.includes(s.id) ? 'selected' : ''}`}
                  onClick={() => setSelected(prev => prev.includes(s.id) ? prev.filter(id => id !== s.id) : [...prev, s.id])}>
                  <input type="checkbox" checked={selected.includes(s.id)} readOnly />
                  <div>
                    <div className="service-name">{s.name}</div>
                    <div className="service-description">{s.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="form-section">
            <h2>Contact Info</h2>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                required
              />
            </div>
          </div>

          {/* Comments */}
          <div className="form-section">
            <h2>Comments</h2>
            <div className="form-group">
              <label>Additional Notes</label>
              <textarea
                value={form.comments}
                onChange={e => setForm({...form, comments: e.target.value})}
                className="form-textarea"
                placeholder="Any special requests or details about your vehicle..."
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit">Submit Request</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestService;