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
                Date: {dataSet.date}
              </h6>
              <h6 className="card-subtitle mb-2 text-muted">
                Usk: {dataSet.usk}
              </h6>
              <h6 className="card-subtitle mb-2 text-muted">
                Genre: {dataSet.genre}
              </h6>
              <h6 className="card-subtitle mb-2 text-muted">
                Duration: {dataSet.duration} in min
              </h6>
              <h6 className="card-subtitle mb-2 text-muted">
                Added by {dataSet.username}
              </h6>
              <p className="card-text">{dataSet.description}</p>
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
          min-height: 20rem;
        }

        .card-title,
        .card-text,
        .isSerie {
          color: #000;
        }
      `}</style>
    </div>
  );
};
