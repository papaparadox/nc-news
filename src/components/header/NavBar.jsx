import { Link } from "react-router";

export default function NavBar() {
  return (
    <nav className='header-nav'>
      <ul className='navbar-links'>
        <Link to='/'>
          <li className='nav-item'>Home</li>
        </Link>
        <Link to='/'>
          <li className='nav-item'>Articles</li>
        </Link>
        <Link to='/topics'>
          <li className='nav-item'>Topics</li>
        </Link>
      </ul>
    </nav>
  );
}
