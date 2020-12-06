import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import axios from 'axios';

import { Layout } from '../../components/Layout';
import { Movies } from '../../components/Movies';

function searchSlug() {
  const router = useRouter();
  const { slug } = router.query;

  const [data, setData] = useState(null);
  const [hasError, sethasError] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () =>
      await axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/movie`, {
          responseType: 'json',
        })
        .catch((err) => {
          sethasError(true);
        })
        .then((res) => {
          const filteredData = [];
          res.data.map((filteredItem) => {
            if (filteredItem.name.toLowerCase().includes(slug.toLowerCase())) {
              filteredData.push(filteredItem);
            } else {
              setNotFound(true);
            }
          });
          setData(filteredData);
        });
    if (slug) {
      fetchData();
    }
  }, [slug]);

  if (hasError) {
    return (
      <Layout title="Search">
        <h1>Search {slug}</h1>
        <p>Failed to load movies</p>
      </Layout>
    );
  }

  if (!data) {
    if (notFound) {
      return (
        <Layout title="Search">
          <h1>Search {slug}</h1>
          <p>No results found</p>
        </Layout>
      );
    }

    return (
      <Layout title="Search">
        <h1>Search {slug}</h1>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Search">
      <h1>Search {slug}</h1>
      <Movies data={data}></Movies>
      <style jsx>{`
        h1 {
          margin: 10px;
        }
      `}</style>
    </Layout>
  );
}

export default searchSlug;
