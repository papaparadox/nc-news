import { Link } from "react-router";

export default function Logo() {
  return (
    <div className='logo'>
      <Link to='/'>
        <img src='../planning/Logo.png' />
      </Link>
    </div>
  );
}
