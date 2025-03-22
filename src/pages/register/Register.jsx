import React, { useState } from 'react';
import './Register.scss';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    mobileNumber: '',
    age: '',
    height: '',
    weight: '',
    bloodGroup: '',
    prevAllergy: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your form submission logic here
  };

  return (
    <div className="complete">
      <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Second Name:</label>
          <input type="text" name="secondName" value={formData.secondName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Mobile Number:</label>
          <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Height:</label>
          <input type="text" name="height" value={formData.height} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Weight:</label>
          <input type="text" name="weight" value={formData.weight} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Blood Group:</label>
          <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Prev Allergy (if any):</label>
          <input type="text" name="prevAllergy" value={formData.prevAllergy} onChange={handleChange} />
        </div>
        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
    </div>
  );
};

export default Register;