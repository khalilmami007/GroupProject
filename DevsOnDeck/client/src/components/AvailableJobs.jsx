import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrgHeader from './OrgHeader';
import axios from 'axios';

const AvailableJobs = () => {
  const navigate = useNavigate();
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/positions');
        setPositions(response.data);
      } catch (error) {
        console.error('Failed to fetch positions:', error.message);
      }
    };
fetchPositions();
     }, []);

   return (
    <div className="container mt-5">
      <OrgHeader/>
      
      <h2 className="mt-3">Available Jobs:</h2>
      <ul className="list-group">
        {positions.map((position) => (
          <li key={position._id} className="list-group-item">
            <ul>
            <li >
              {position.Name}
            </li>
            <li>Description:
            
              {position.Description}
            </li><li>Skills:
              {position.Skills.map((sk) => (
                <ul>
                    <li>{sk}</li>
                </ul>
              ))
             }
            </li>
            </ul>
          </li>
        ))}
      </ul>

      
    </div>
  );
};

export default AvailableJobs;