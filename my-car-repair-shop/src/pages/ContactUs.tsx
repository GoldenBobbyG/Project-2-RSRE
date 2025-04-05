import React, { useState } from 'react';
import Sidebar from '../components/CustSidebar';
import './ContactUs.css';

const ContactUs: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const contactInfo = [
    { icon: '📍', title: 'Address', content: '123 Auto Drive, Mechanic Valley, CA 94025' },
    { icon: '📞', title: 'Phone', content: '(555) 123-4567' },
    { icon: '✉️', title: 'Email', content: 'support@bootcampauto.com' },
    { icon: '🕒', title: 'Hours', content: 'Mon-Fri: 8am-6pm\nSat: 9am-4pm\nSun: Closed' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', form);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    alert('Message sent!');
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <h1>Contact Us</h1>
        <p>Have questions? Reach out to our team.</p>

        <div className="contact-container">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              {['name', 'email', 'phone', 'subject'].map(field => (
                <div key={field} className="form-group">
                  <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    value={form[field as keyof typeof form]}
                    onChange={e => setForm({ ...form, [field]: e.target.value })}
                    required={field !== 'phone'}
                  />
                </div>
              ))}
              <div className="form-group">
                <label>Message</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </div>

          <div className="contact-info">
            <h2>Our Information</h2>
            {contactInfo.map(item => (
              <div key={item.title} className="info-item">
                <span className="info-icon">{item.icon}</span>
                <div className="info-content">
                  <strong>{item.title}</strong>
                  <p>{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;