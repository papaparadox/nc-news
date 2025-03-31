import { Link } from "react-router";

export default function NavBar() {
  return (
    <nav class='header-nav'>
      <ul class='navbar'>
        <Link to='/'>
          <li class='nav-item'>Home</li>
        </Link>
        <Link to='/'>
          <li class='nav-item'>Articles</li>
        </Link>
      </ul>
    </nav>
  );
}
