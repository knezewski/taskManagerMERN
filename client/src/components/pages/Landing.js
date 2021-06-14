import React from 'react';
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';

const Landing = () => {
  const {isAuthenticated} = useSelector((state) => state.auth);

  if (isAuthenticated ) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <nav className='top'>
        <div>
          <Button color='inherit' href='/login'>
            Login
          </Button>
          <Button variant='contained' href='/register'>
            Sign Up
          </Button>
        </div>
      </nav>
      <div className='landing-inner'>
        <Typography component='h1' variant='h5'>
            Task-manager
        </Typography>
        <div className='buttons'>
          <Button variant='outlined' color='inherit' href='/register'>
            Sign Up
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Landing;
