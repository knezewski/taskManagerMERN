import React from 'react';
const BoardTitle = ({ board }) => {
  return (
    <h2 className='board-title'>
      {board.title}
    </h2>
  )
};

export default BoardTitle;
