import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LogHeader from './LogHeader';


const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    contactemail: '',
    password: '',
  });

  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your backend for login
      const response = await axios.post('http://localhost:8000/login', formData);
      const { token } = response.data;

      // Store the token in localStorage or your preferred state management
      // For simplicity, storing in localStorage in this example
      localStorage.setItem('token', token);

      console.log('Login successful!');
      
      // Redirect to the dashboard or any other route after successful login
      navigate('/orgs/Dashboard');
    } catch (error) {
      console.error('Login failed:', error.message);
      setFormError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div>
      <div>
      < LogHeader/>
      </div>
      <div className='LogContainer'>
      <h2>Welcome Back </h2>
      <h4>Let's find you some condidates!</h4>
           <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">Contact Email:</Form.Label>
                    <Col sm="6">
                    <Form.Control type="email" name="contactemail" value={formData.contactemail} onChange={handleChange}/>
                    </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="4">Password</Form.Label>
                    <Col sm="6">
                    <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} />
                    </Col>
                    </Form.Group>
                    <Button variant="primary" type="submit">Log In</Button>
                    {formError && <p style={{ color: 'red' }}>{formError}</p>}
                    </Form>
                </div>
    </div>
  );
};

export default Login;