import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import cookies from 'js-cookie';
import { useAuth } from '../hooks/useAuth';

export const Header = ({ auth = false }) => {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [authenticated, username] = useAuth();

  const genre = ['Comedy', 'Sci-fi', 'Horror', 'Thriller'];

  function logout() {
    cookies.remove('netgoflix');
    router.reload();
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark Header">
        <a className="navbar-brand" href="#">
          Netgoflix
        </a>
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
            {authenticated === false && (
              <Link href="/login">
                <a className="nav-link login">Login</a>
              </Link>
            )}
            {authenticated === true && (
              <a
                href="#"
                className="nav-link login"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Click to logout"
                onClick={logout}>
                {username}
              </a>
            )}
          </span>

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
      `}</style>
    </>
  );
};
