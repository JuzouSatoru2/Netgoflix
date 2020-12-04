import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { Layout } from '../../components/Layout';

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
        <p>Failed to load movie</p>
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
      <div className="row">
        {data.map((dataSet) => (
          <div className="col" key={dataSet._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{dataSet.name}</h5>
                <h6 className="card-subtitle mb-2 isSerie">
                  {dataSet.isSerie === true ? 'Serie' : 'Movie'}
                </h6>
                <h6 className="card-subtitle mb-2 text-muted">
                  Date: {dataSet.date}
                </h6>
                <h6 className="card-subtitle mb-2 text-muted">
                  Usk: {dataSet.usk}
                </h6>
                <h6 className="card-subtitle mb-2 text-muted">
                  Genre: {dataSet.genre}
                </h6>
                <h6 className="card-subtitle mb-2 text-muted">
                  Added by {dataSet.username}
                </h6>
                <p className="card-text">{dataSet.description}</p>
                <a href="#" className="card-link">
                  Add to favs
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        h1 {
          margin: 10px;
        }

        .card {
          width: 18rem;
          margin: 1%;
          min-height: 20rem;
        }

        .card-title,
        .card-text,
        .isSerie {
          color: #000;
        }
      `}</style>
    </Layout>
  );
}

export default GenreSlug;
