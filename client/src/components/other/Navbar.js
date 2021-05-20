import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    return '';
  }

  const name = user && user.name;
  const email = user && user.email;

  return (
    <nav className='navbar'>
      <Link to='/' onClick={() => dispatch(logout())}>
        Logout
      </Link>
      <Link to='/dashboard'>
        <div>
          <p>{name}</p>
          <p>{email}</p>
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
