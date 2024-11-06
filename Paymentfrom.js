import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Paymentform.css';

const countries = ['India', 'United States', 'Canada', 'United Kingdom', 'Australia'];
const regions = {
  'United States': ['California', 'Texas', 'Florida', 'New York', 'Illinois'],
  Canada: ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba'],
  'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland'],
  Australia: ['New South Wales', 'Victoria', 'Queensland', 'Western Australia'],
  India: ['Andhra Pradesh', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Telangana'],
};

const Paymentform = () => {
  const location = useLocation();
  const { price } = location.state || { price: 0 };

  const [formData, setFormData] = useState({
    nameoncard: '',
    email: '',
    password: '',
    cardinformation: '',
    country: '',
    region: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const errors = {};

    if (!formData.nameoncard) {
      errors.nameoncard = 'Name on card is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.nameoncard)) {
      errors.nameoncard = 'Invalid name';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!formData.cardinformation) {
      errors.cardinformation = 'Card information is required';
    } else if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(formData.cardinformation)) {
      errors.cardinformation = 'Card information is invalid';
    }

    if (!formData.country) {
      errors.country = 'Country is required';
    }

    if (!formData.region) {
      errors.region = 'Region is required';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      setSuccessMessage('Payment is successful!');
      setErrors({});
      // Simulate API call with a delay
      setTimeout(() => {
        console.log('Payment data:', formData);
      }, 1000);
    } else {
      setErrors(errors);
      setSuccessMessage('');
    }
  };

  return (
    <div className="payment-form">
      <h1>Payment</h1>
      <h2>Pay with your card</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nameoncard"><h4>Name on Card:</h4></label>
          <input
            type="text"
            id="nameoncard"
            name="nameoncard"
            value={formData.nameoncard}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {errors.nameoncard && <p className="error">{errors.nameoncard}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email"><h4>Email:</h4></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@mail.com"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password"><h4>Password:</h4></label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="cardinformation"><h4>Card Information:</h4></label>
          <input
            type="text"
            id="cardinformation"
            name="cardinformation"
            value={formData.cardinformation}
            onChange={handleChange}
            placeholder="1234 1234 1234 1234"
          />
          {errors.cardinformation && <p className="error">{errors.cardinformation}</p>}
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="country"><h4>Country:</h4></label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            {errors.country && <p className="error">{errors.country}</p>}
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="region"><h4>Region:</h4></label>
            <select
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              disabled={!formData.country}
            >
              <option value="">Select Region</option>
              {formData.country && regions[formData.country].map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            {errors.region && <p className="error">{errors.region}</p>}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Pay</button>
      </form>
      {successMessage && <p className="success">{successMessage}</p>}
      <div className="price-display">
        <h3>Total Price: ${price}</h3>
      </div>
    </div>
  );
};

export default Paymentform;
