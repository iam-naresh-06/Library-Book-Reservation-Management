import React, { useState } from 'react';

const BorrowerForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      setFormData({ name: '', email: '' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} data-testid="borrower-form">
      <div className="form-group">
        <label>Name:</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          data-testid="name-input"
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-message" data-testid="name-error">{errors.name}</span>}
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          data-testid="email-input"
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message" data-testid="email-error">{errors.email}</span>}
      </div>
      <button type="submit" data-testid="submit-button">Add Borrower</button>
    </form>
  );
};

export default BorrowerForm;