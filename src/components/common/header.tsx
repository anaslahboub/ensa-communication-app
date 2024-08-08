import { Link } from 'react-router-dom';
import { all_routes } from '../route/routes';
function Header() {
  const routes = all_routes;

  return (
    <header className="header">
      <div className="container-fluid">
        <nav className="navbar">
          <div className="navbar-logo">
            <img src="/path/to/logo.png" alt="Logo ENSAA" />
          </div>
          <div className="main-menu">
            <ul className="main-nav">
              <li>
                <Link to={routes.home} aria-label="Home">
                  Home <i className="fas fa-chevron-down" />
                </Link>
              </li>
              <li>
                <Link to={routes.about} aria-label="About">
                  About <i className="fas fa-chevron-down" />
                </Link>
              </li>
              <li>
                <Link to={routes.contactUs} aria-label="Contact Us">
                  Contact <i className="fas fa-chevron-down" />
                </Link>
              </li>
              <li>
                <Link to={routes.chat} aria-label="Chat">
                  Chat <i className="fas fa-chevron-down" />
                </Link>
              </li>
            </ul>
          </div>
          <ul className="nav-header">
            <li className="nav-item">
              <Link className="nav-link header-login" to={routes.login} aria-label="Sign In">
                <span>
                  <i className="fa-regular fa-user" />
                </span>
                Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link header-reg" to={routes.signIn} aria-label="Sign Up">
                <span>
                  <i className="fa-solid fa-lock" />
                </span>
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
