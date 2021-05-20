import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { getBoards } from '../../actions/board';
import { Button } from '@material-ui/core';
import CreateBoard from '../other/CreateBoard';
import Navbar from '../other/Navbar';
import CircularProgress from '@material-ui/core/CircularProgress';


const Dashboard = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const boards = useSelector((state) => state.board.boards);
  const loading = useSelector((state) => state.board.dashboardLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  useEffect(() => {
    document.title = 'Your Boards';
  }, []);

  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }


  return (
    <div className='dashboard-and-navbar'>
      <Navbar />
      <section className='dashboard'>
        <h1>Welcome {user && user.name}</h1>
        <h2>{boards.length ? "You boards" : "Your have no boards"}</h2>
        {loading && <CircularProgress className='dashboard-loading' />}
        <ul className='boards'>
          {boards.map((board) => (
            <li key={board._id}  className='board-card'>
              {board.title || ''}
              <Button margin="normal" variant="contained" >
                <Link to={`/board/${board._id}`}  style={{textDecoration: 'none', color: 'black'}} >
                  Go to
                </Link>
              </Button>
            </li>
          ))}
           <CreateBoard />
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
