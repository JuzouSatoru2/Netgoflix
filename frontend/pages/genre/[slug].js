import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { Layout } from '../../components/Layout';
import { Movies } from '../../components/Movies';

function GenreSlug() {
  const [data, setData] = useState(null);
  const [hasError, sethasError] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/genre/${slug}`, {
          responseType: 'json',
        })
        .catch((err) => {
          sethasError(true);
        })
        .then((response) => {
          setData(response.data);
        });
    };
    if (slug) {
      fetchData();
    }
  }, [slug]);

  if (hasError) {
    return (
      <Layout title="Genre">
        <h1>Browse {slug}</h1>
        <p>Failed to load movies</p>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout title="Genre">
        <h1>Browse {slug}</h1>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Genre">
      <h1>Browse {slug}</h1>
      <Movies data={data}></Movies>
      <style jsx>{`
        h1 {
          margin: 10px;
        }
      `}</style>
    </Layout>
  );
}

export default GenreSlug;
