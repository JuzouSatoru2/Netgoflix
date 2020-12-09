import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import axios from 'axios';
import cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { Layout } from '../components/Layout';

function Register() {
  const router = useRouter();
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  function submitRegister(event) {
    event.preventDefault();
    cookies.remove('netgoflix');

    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/register`,
        {
          username: username,
          email: email,
          password: password,
        },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((res) => {
        cookies.set('netgoflix', res.data.token);
        router.push('/');
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

  return (
    <Layout title="Register">
      <h1>Please register</h1>
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
      <form className="col-md-4 col-md-offset-4">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Username</label>
          <input
            type="username"
            className="form-control"
            id="exampleInputUsername1"
            aria-describedby="UsernameHelp"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(event) => setEmail(event.target.value)}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <Link href="/login">
          <a>Login instead</a>
        </Link>
        <br />
        <br />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={submitRegister}>
          Submit
        </button>
      </form>
    </Layout>
  );
}

export default Register;
