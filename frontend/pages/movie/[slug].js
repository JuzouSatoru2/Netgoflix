import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import axios from 'axios';

import { Layout } from '../../components/Layout';
import { Favourites } from '../../components/Favourites';

function searchMovie() {
  const router = useRouter();
  const { slug } = router.query;

  const [data, setData] = useState(null);
  const [hasError, sethasError] = useState(false);

  function isFavourite(movieName) {
    if (
      localStorage
        .getItem('favourites')
        .toLowerCase()
        .includes(movieName.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    const fetchData = async () =>
      await axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/movie/${slug}`, {
          responseType: 'json',
        })
        .catch((err) => {
          sethasError(true);
        })
        .then((res) => {
          setData(res.data);
        });
    if (slug) {
      fetchData();
    }
  }, [slug]);

  if (hasError) {
    return (
      <Layout title="Movie">
        <h1>Movie {slug}</h1>
        <p>Failed to load movie</p>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout title="Movie">
        <h1>Movie {slug}</h1>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={data.name}>
      <div className="jumbotron">
        <h1 className="display-4">{data.name}</h1>
        <p className="text-muted">
          {data.isSerie === true ? 'Serie' : 'Movie'}
        </p>
        <p className="lead">{data.description}</p>
        <hr className="my-4" />
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Publishing date: {data.date}</li>
          <li className="list-group-item">Usk: {data.usk}</li>
          <li className="list-group-item">Genre: {data.genre}</li>
          <li className="list-group-item">Duration: {data.duration} min</li>
          <li className="list-group-item">Added by: {data.username}</li>
        </ul>
        <Favourites
          initialState={isFavourite(data.name)}
          movieName={data.name}></Favourites>
      </div>
      <style jsx>{`
        .jumbotron {
          color: #000;
        }

        ul {
          margin-bottom: 1rem;
        }
      `}</style>
    </Layout>
  );
}

export default searchMovie;
