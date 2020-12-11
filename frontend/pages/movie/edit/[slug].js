import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Error from 'next/error';

import axios from 'axios';
import cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import useAuth from '../../../hooks/useAuth';
import { Layout } from '../../../components/Layout';

function editMovie() {
  const router = useRouter();
  const { slug } = router.query;

  const [name, setName] = useState('');
  const [date, setDate] = useState(null);
  const [usk, setUsk] = useState(null);
  const [genre, setGenre] = useState('');
  const [isSerie, setIsSerie] = useState(false);
  const [authenticated, username] = useAuth();
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    const fetchData = async () =>
      await axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/movie/${slug}`, {
          responseType: 'json',
        })
        .catch((err) => {
          toast.error('Something went wrong :(', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .then((res) => {
          setName(res.data.name);
          setDate(res.data.date);
          setUsk(res.data.usk);
          setGenre(res.data.genre);
          setIsSerie(res.data.isSerie);
          setDescription(res.data.description);
          setDuration(res.data.duration);
        });
    if (slug) {
      fetchData();
    }
  }, [slug]);

  function submitMovie(event) {
    event.preventDefault();
    axios
      .put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/movie/${slug}`,
        {
          name: name,
          date: date,
          usk: usk,
          genre: genre,
          isSerie: isSerie,
          username: username,
          description: description,
          duration: duration,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: cookies.get('netgoflix'),
          },
        }
      )
      .then((res) => {
        router.push('/movie/' + res.data.slug);
      })
      .catch((err) => {
        toast.error('Something went wrong :(', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  if (!authenticated) {
    return <Error statusCode="401" title="Not authenticated"></Error>;
  }

  return (
    <Layout title="Add">
      <h1>Edit movie</h1>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <form className="col-md-8">
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="Inputname">Name</label>
            <input
              type="text"
              className="form-control"
              id="Inputname"
              aria-describedby="nameHelp"
              onChange={(event) => setName(event.target.value)}
              placeholder="Star Wars I"
              value={name || ''}
              disabled
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="Inputdate">Publishing date</label>
            <input
              type="text"
              className="form-control"
              id="Inputdate"
              aria-describedby="dateHelp"
              onChange={(event) => setDate(event.target.value)}
              placeholder="19.8.1999"
              value={date || ''}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="Inputusk">Usk</label>
            <input
              type="text"
              className="form-control"
              id="Inputusk"
              aria-describedby="uskHelp"
              onChange={(event) => setUsk(event.target.value)}
              placeholder="6"
              value={usk || ''}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="Inputgenre">Genre</label>
            <input
              type="text"
              className="form-control"
              id="Inputgenre"
              aria-describedby="genreHelp"
              onChange={(event) => setGenre(event.target.value)}
              placeholder="Sci-Fi"
              value={genre || ''}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="Inputisserie">Movie or serie</label>
            <select
              name="Inputisserie"
              id="Inputisserie"
              className="form-control"
              aria-describedby="descriptionHelp"
              onChange={(event) =>
                setIsSerie(event.target.value === 'movie' ? false : true)
              }>
              <option value="movie">Movie</option>
              <option value="serie">Serie</option>
            </select>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="Inputduration">Duration</label>
            <input
              type="text"
              className="form-control"
              id="Inputduration"
              aria-describedby="durationHelp"
              onChange={(event) => setDuration(event.target.value)}
              placeholder="136 (per min)"
              value={duration || ''}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="Inputdescription">Description</label>
            <textarea
              type="text"
              className="form-control"
              id="Inputdescription"
              aria-describedby="descriptionHelp"
              rows="6"
              cols="50"
              onChange={(event) => setDescription(event.target.value)}
              value={description || ''}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary" onClick={submitMovie}>
          Submit
        </button>
        <button type="button" className="btn btn-danger">
          Delete
        </button>
      </form>
      <style jsx>{`
        .btn-danger {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
}

export default editMovie;
