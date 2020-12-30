import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import cookies from 'js-cookie';
import { useAuth } from '@/hooks/useAuth';

export const Header = () => {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [authenticated, username, loading] = useAuth();

  const genre = ['Comedy', 'Sci-fi', 'Horror', 'Thriller'];

  function logout() {
    cookies.remove('netgoflix');
    if (router.pathname === '/') {
      router.reload('/');
    } else {
      router.push('/');
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark Header">
        <Link href="/">
          <a className="navbar-brand">Netgoflix</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link href="/">
                <a className="nav-link">Home</a>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle active"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                Genre
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {genre.map((genreItem, index) => (
                  <div key={index}>
                    <Link href={`/genre/${genreItem.toLowerCase()}`}>
                      <a className="dropdown-item">{genreItem}</a>
                    </Link>
                  </div>
                ))}
                <div className="dropdown-divider"></div>
                <Link href="/genre">
                  <a className="dropdown-item">Browse all genre</a>
                </Link>
              </div>
            </li>

            <li className="nav-item active">
              <Link href="/favourites">
                <a className="nav-link">Favourites</a>
              </Link>
            </li>
          </ul>

          <span className="navbar-text">
            {authenticated === false && !loading && (
              <Link href="/login">
                <a className="nav-link login">Login</a>
              </Link>
            )}
          </span>
          {authenticated === true && (
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle active"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
                  {username}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link href="/movie/add">
                    <a className="dropdown-item">Add new movie</a>
                  </Link>
                  <div className="dropdown-divider"></div>
                  <p className="dropdown-item logout" onClick={logout}>
                    Logout
                  </p>
                </div>
              </li>
            </ul>
          )}

          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setInput(e.target.value)}
            />
            <Link href={'/search/' + input}>
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit">
                Search
              </button>
            </Link>
          </form>
        </div>
      </nav>
      <style jsx>{`
        .login {
          padding-left: 0;
        }

        .logout {
          color: #dc3545;
          cursor: pointer;
          margin-bottom: 0;
        }
      `}</style>
    </>
  );
};
