import Link from 'next/link';

export const Header = () => {
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
            <li className="nav-item active">
              <Link href="/genres">
                <a className="nav-link">Genres</a>
              </Link>
            </li>

            <li className="nav-item active">
              <Link href="/login">
                <a className="nav-link">Login</a>
              </Link>
            </li>

            <li className="nav-item active">
              <Link href="/register">
                <a className="nav-link">Register</a>
              </Link>
            </li>

            <li className="nav-item active">
              <Link href="/favourites">
                <a className="nav-link">Favourites</a>
              </Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </>
  );
};
