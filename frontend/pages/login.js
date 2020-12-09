import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import axios from 'axios';
import cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { Layout } from '../components/Layout';

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  function submitLogin(event) {
    event.preventDefault();
    cookies.remove('netgoflix');
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/login`,
        {
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
    <Layout title="Login">
      <h1>Please login</h1>
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
        <Link href="/register">
          <a>Register instead</a>
        </Link>
        <br />
        <br />
        <button type="submit" className="btn btn-primary" onClick={submitLogin}>
          Submit
        </button>
      </form>
    </Layout>
  );
}

export default Login;
