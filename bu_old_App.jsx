// src/App.jsx
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; // Import your initialized supabase client
import './App.css'; // Assuming you keep the default Vite styling

function App() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getProfiles() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profile') // Use your 'profile' table name
          .select('*')
          .limit(5); // Just fetch a few for the example

        if (error) {
          throw error; // Throw error to be caught by the catch block
        }
        setProfiles(data);
      } catch (err) {
        console.error('Error fetching profiles:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getProfiles();
  }, []); // Empty dependency array means this runs once on component mount

  if (loading) return <p>Loading profiles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>NeighborLink - Profiles</h1>
        <p>Data fetched from Supabase:</p>
        {profiles.length > 0 ? (
          <ul>
            {profiles.map((profile) => (
              <li key={profile.id}>
                {/* Assuming your profile table has an 'id' and 'name' or similar field */}
                {profile.name || `Profile ID: ${profile.id}`}
              </li>
            ))}
          </ul>
        ) : (
          <p>No profiles found or table is empty.</p>
        )}
      </header>
    </div>
  );
}

export default App;