import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Footer.css';

const Footer: React.FC = () => {
  const [numberOfClients, setNumberOfClients] = useState(0);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:8080/clientes');
        setNumberOfClients(response.data.length);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  return (
    <footer className="footer">
      Exibindo {numberOfClients} clientes
    </footer>
  );
};

export default Footer;
