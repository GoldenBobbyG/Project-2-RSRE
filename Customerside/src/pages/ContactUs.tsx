import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './ContactUs.css';

const ContactUs: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');

  // Mock company contact info
  const companyInfo = {
    address: '123 Auto Drive, Mechanic Valley, CA 94025',
    phone: '(555) 123-4567',
    email: 'support@bootcampauto.com',
    hours: 'Monday-Friday: 8am-6pm, Saturday: 9am-4pm, Sunday: Closed'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your contact form API
    console.log('Contact form submitted:', {
      name,
      email,
      phone,
      subject,
      message
    });
    
    // Reset form
    setName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
    alert('Your message has been sent successfully!');
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <h1>Contact Us</h1>
        <p>Have questions or need assistance? Reach out to our team using the form below.</p>

        <div className="contact-container">
          <div className="contact-info">
            <h2>Our Information</h2>
            <div className="info-item">
              <span className="info-icon">📍</span>
              <div>
                <strong>Address:</strong>
                <p>{companyInfo.address}</p>
              </div>
            </div>
            
            <div className="info-item">
              <span className="info-icon">📞</span>
              <div>
                <strong>Phone:</strong>
                <p>{companyInfo.phone}</p>
              </div>
            </div>
            
            <div className="info-item">
              <span className="info-icon">✉️</span>
              <div>
                <strong>Email:</strong>
                <p>{companyInfo.email}</p>
              </div>
            </div>
            
            <div className="info-item">
              <span className="info-icon">🕒</span>
              <div>
                <strong>Business Hours:</strong>
                <p>{companyInfo.hours}</p>
              </div>
            </div>
          </div>

          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="What is this regarding?"
                  required
                />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you?"
                  rows={4}
                  required
                />
              </div>

              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;