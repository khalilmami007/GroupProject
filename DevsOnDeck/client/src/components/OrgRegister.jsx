import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import LogHeader from './LogHeader';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import RegHeader from './RegHeader';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const OrgRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    orgname: '',
    firstname: '',
    lastname: '',
    contactemail: '',
    orgadress: '',
    orgcity: '',
    orgstate: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({
    orgname: '',
    firstname: '',
    lastname: '',
    contactemail: '',
    orgadress: '',
    orgcity: '',
    orgstate: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate the form before submitting
      const validationErrors = validateForm(formData);
      if (Object.values(validationErrors).some((error) => error !== '')) {
        setFormErrors(validationErrors);
        return;
      }

      // Make a POST request to your backend for registration
      await axios.post('http://localhost:8000/register', formData);
      console.log('Registration successful!');
      
      // Redirect to /orgs/login after successful registration
      navigate('/orgs/Login');
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  const validateForm = (data) => {
    const errors = {};

    // Example validation logic (you might need to adjust this based on your requirements)
    if (!data.orgname) errors.orgname = 'Organization Name is required';
    if (!data.firstname) errors.firstname = 'First Name is required';
    if (!data.lastname) errors.lastname = 'Last Name is required';
    if (!data.contactemail) errors.contactemail = 'Contact Email is required';
    if (!data.orgadress) errors.orgadress = 'Organization Address is required';
    if (!data.orgcity) errors.orgcity = 'Organization City is required';
    if (!data.orgstate) errors.orgstate = 'Organization State is required';
    if (!data.password) errors.password = 'Password is required';
    if (data.password.length < 8) errors.password = 'Password must be 8 characters or longer';
    if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords do not match';

    return errors;
  };

  return (
    <div>
       <RegHeader/>
             <Card style={{ width: '50rem' }} className='addform'>
                <Card.Body className='addform'>
                <h2>Organization sign up</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <div >
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="3"> Organization Name:</Form.Label>
                        <Col sm="9">
                        <Form.Control type="text" name="orgname" value={formData.orgname} onChange={handleChange}/>
                        <p style={{ color: 'red' }}>{formErrors.orgname}</p>
                        </Col>
                        </Form.Group>

                   <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2"> First Name:</Form.Label>
                        <Col sm="4">
                        <Form.Control type="text" name="firstname" value={formData.firstname} onChange={handleChange}/>
                        <p style={{ color: 'red' }}>{formErrors.firstname}</p>
                        </Col>
                        <Form.Label column sm="2"> Last Name:</Form.Label>
                        <Col sm="4">
                        <Form.Control type="text" name="lastname" value={formData.lastname} onChange={handleChange}/>
                        <p style={{ color: 'red' }}>{formErrors.lastname}</p>
                        </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="3"> Contact Email:</Form.Label>
                        <Col sm="9">
                        <Form.Control type="text" name="contactemail" value={formData.contactemail} onChange={handleChange}/>
                        <p style={{ color: 'red' }}>{formErrors.contactemail}</p>
                        </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="3">Organization Address:</Form.Label>
                        <Col sm="9">
                        <Form.Control type="text"name="orgadress" value={formData.orgadress} onChange={handleChange}/>
                        <p style={{ color: 'red' }}>{formErrors.orgadress}</p>
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="3">Organization City:</Form.Label>
                        <Col sm="3">
                        <Form.Control  type="text"  name="orgcity" value={formData.orgcity} onChange={handleChange} />
                        <p style={{ color: 'red' }}>{formErrors.orgcity}</p>
                        </Col>
                         <Form.Label column sm="3">Organization State:</Form.Label>
                        <Col sm="2">
                        <Form.Select name="orgstate" value={formData.orgstate} onChange={handleChange}  >
                        <option value="State1">State1</option>
                        <option value="State2">State2</option>
                        <option value="State3">State3</option>
                        </Form.Select>
                        <p style={{ color: 'red' }}>{formErrors.orgstate}</p>

                        </Col>
                        </Form.Group >
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                          <Form.Label column sm="3">Password:</Form.Label>
                       
                        <Col sm="9">
                        <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} />
                        </Col>
                        <p style={{ color: 'red' }}>{formErrors.password}</p>
                        </Form.Group >
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="3">Confirm Password:</Form.Label>
                        
                        <Col sm="9">
                        <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}/>
                        </Col>
                        <p style={{ color: 'red' }}>{formErrors.confirmPassword}</p>
                        </Form.Group >        
                       
                        </div>
                        
                        
                            </Form.Group>
                        <Button variant="primary" type="submit">Register</Button>
                    </Form>
                    <Link to="/"> Need to sign up as a Developer?</Link>
                </Card.Body>
            </Card>
        </div>





  );
};






export default OrgRegister;