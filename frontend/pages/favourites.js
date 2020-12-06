import { useState, useEffect } from 'react';

import axios from 'axios';

import { Layout } from '../components/Layout';
import { Movies } from '../components/Movies';

function Favourites() {
  const [data, setData] = useState(null);
  const [hasError, sethasError] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/movie`, {
        responseType: 'json',
      })
      .catch((err) => {
        sethasError(true);
      })
      .then((res) => {
        const currentFavourites = localStorage.getItem('favourites');
        const filteredData = [];
        res.data.map((filteredItem) => {
          if (
            currentFavourites
              .toLowerCase()
              .includes(filteredItem.name.toLowerCase())
          ) {
            filteredData.push(filteredItem);
          }
        });
        setData(filteredData);
      });
  }, []);

  if (hasError) {
    return (
      <Layout title="Favourites">
        <h1>Browse favourites</h1>
        <p>Failed to load movies</p>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout title="Favourites">
        <h1>Browse favourites</h1>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Favourites">
      <h1>Browse favourites</h1>
      <Movies data={data}></Movies>
      <style jsx>{`
        h1 {
          margin: 10px;
        }
      `}</style>
    </Layout>
  );
}

export default Favourites;
