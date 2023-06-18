import React, { useState, useEffect } from 'react';

const starWars = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('<https://swapi.dev/api/people>')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(data => setData(data))
      .catch(err => {
        console.error("Error fetching data: ", err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // This empty array means the effect only runs once, on component mount.

  if (loading) return "Loading...";
  if (error) return "Error!";

  return (
    <div>
      {data.results.map(person => (
        <div key={person.name}>
          <h2>{person.name}</h2>
          <p>Height: {person.height}</p>
          <p>Mass: {person.mass}</p>
          {/* And any other attributes of the person you wish to display... */}
        </div>
      ))}
    </div>
  );
}

export default starWars;
