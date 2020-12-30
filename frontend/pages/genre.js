import Link from 'next/link';

import { Layout } from '@/components/Layout';

function Genre() {
  const genreList = [
    'Comedy',
    'Sci-Fi',
    'Horror',
    'Romance',
    'Action',
    'Thriller',
    'Drama',
    'Mystery',
    'Crime',
    'Animation',
    'Adventure',
    'Fantasy',
  ];
  return (
    <Layout title="Genre">
      <h1>Browse genre</h1>
      <div className="row">
        {genreList.map((genre, index) => (
          <div className="col" key={index}>
            <div className="card">
              <Link href={`/genre/${genre.toLocaleLowerCase()}`}>
                <a>
                  <img
                    src={`https://m.media-amazon.com/images/G/01/IMDb/genres/${genre}._CB1513316167_SX233_CR0,0,233,131_AL_.jpg`}
                    className="card-img-top"
                    alt={genre}
                  />
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .card {
          width: 18rem;
          margin: 10px;
        }
      `}</style>
    </Layout>
  );
}

export default Genre;
