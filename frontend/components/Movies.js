import Link from 'next/link';

import { Favourites } from './Favourites';

export const Movies = ({ data }) => {
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

  return (
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
                Added by {dataSet.username}
              </h6>
              <Link href={'/movie/' + dataSet.slug}>
                <a>
                  <button type="button" className="btn btn-primary">
                    Read more
                  </button>
                </a>
              </Link>
              <Favourites
                initialState={isFavourite(dataSet.name)}
                movieName={dataSet.name}></Favourites>
            </div>
          </div>
        </div>
      ))}
      <style jsx>{`
        .card {
          width: 18rem;
          margin: 3%;
          min-height: 15rem;
        }

        button {
          margin-bottom: 1rem;
        }

        .card-title,
        .isSerie {
          color: #000;
        }
      `}</style>
    </div>
  );
};
