import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { renameList } from '../../actions/board';
import { TextField } from '@material-ui/core';

const ListTitle = ({ list }) => {
  const { user } = useSelector((state) => state.auth);

  const boardMembers = useSelector((state) => state.board.board.members);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(list.title);
  const dispatch = useDispatch();

  const boardMember = boardMembers.filter((item) => {
    if(user.name === item.name ) {
      return boardMembers;
    }
  });

  const status = boardMember.map(({isAdmin}) => {
    return isAdmin
  })

  const [isAdmin] = status;

  useEffect(() => {
    setTitle(list.title);
  }, [list.title]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(renameList(list._id, { title }));
    setEditing(false);
  };

  return (
    <>
      {
        isAdmin ? (
          !editing ? (
            <h3 className='list-title' onClick={() => setEditing(true)}>
              {list.title}
            </h3>
          ) : (
            <form onSubmit={(e) => onSubmit(e)}>
              <TextField required value={title} onChange={(e) => setTitle(e.target.value)} />
            </form>
          )
        ) : (
            <h3 className='list-title'>{list.title}</h3>
        )
      }
    </>
  )
};

ListTitle.propTypes = {
  list: PropTypes.object.isRequired,
};

export default ListTitle;
