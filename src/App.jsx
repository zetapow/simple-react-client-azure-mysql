// Import required modules
import { useEffect, useState } from 'react';
import axios from 'axios';

// Get the API_HOST from the .env file
const API_HOST = import.meta.env.VITE_API_HOST;

// Define the App component
const App = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch Oceania countries
  const fetchOceaniaCountries = async () => {
    try {
      const response = await axios.get(`${API_HOST}/oceania`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Oceania countries:', error.message);
      throw new Error('Failed to fetch Oceania countries');
    }
  };

  // Function to display Oceania countries
  useEffect(() => {
    const displayOceaniaCountries = async () => {
      try {
        const fetchedCountries = await fetchOceaniaCountries();
        if (fetchedCountries && fetchedCountries.length > 0) {
          setCountries(fetchedCountries);
        } else {
          setError('No countries found for Oceania.');
        }
      } catch (error) {
        console.log('Error displaying Oceania countries:', error);
        setError('Failed to display Oceania countries.');
      }
    };

    displayOceaniaCountries();
  }, []);

  return (
    <div>
      <h1>Oceania Countries</h1>
      {error && <p>{error}</p>}
      <ul>
        {countries.map((country, index) => (
          <li key={index}>
            <strong>{country.Name}</strong> - Life Expectancy: {country.LifeExpectancy}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Export the App component
export default App;
