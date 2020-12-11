import { useState, useEffect } from 'react';

import axios from 'axios';

import { Layout } from '../components/Layout';
import { Movies } from '../components/Movies';

function Index() {
  const [data, setData] = useState(null);
  const [hasError, sethasError] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('favourites')) {
      localStorage.setItem('favourites', '');
    }

    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/movie`, {
        responseType: 'json',
      })
      .catch((err) => {
        sethasError(true);
      })
      .then((res) => {
        setData(res.data);
      });
  }, []);

  if (hasError) {
    return (
      <Layout>
        <h1>Browse movies</h1>
        <p>Failed to load movies</p>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <h1>Browse movies</h1>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>Browse movies</h1>
      <Movies data={data}></Movies>
      <style jsx>{`
        h1 {
          margin: 10px;
        }
      `}</style>
    </Layout>
  );
}

export default Index;
