import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CloseIcon from '@material-ui/icons/Close';
import { editBoard } from '../../actions/board';
import { TextField, Button, Divider, Drawer  } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import useStyles from '../../utils/drawerStyles';

const BoardDrawer = () => {
  const classes = useStyles();
  const { user } = useSelector((state) => state.auth);
  const board = useSelector((state) => state.board.board);
  const boardMembers = useSelector((state) => state.board.board.members);


  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState(board.title);
  const [description, setDescription] = useState(board.description);
  const [selectedDate, handleDateChange] = useState(board.selectedDate);
  const dispatch = useDispatch();


  // eslint-disable-next-line array-callback-return
  const boardMember = boardMembers.filter((item) => {
    if(user.name === item.name ) {
      return boardMembers;
    }
  });

  const status = boardMember.map(({isAdmin}) => {
    return isAdmin
  })

  const isAdmin = status[0];

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(editBoard( board._id, { title, description, selectedDate }));
  };

  const deadLine = new Date(board.selectedDate).toDateString();

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        variant='contained'
        className={open ? classes.hide : classes.showMenuButton}
      >
        <MoreHorizIcon fontSize='small' /> Board info
      </Button>
      <Drawer
        className={open ? classes.drawer : classes.hide}
        variant='persistent'
        anchor='right'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
          <div>
            <div className={classes.drawerHeader}>
              <h3>Menu</h3>
              <Button onClick={handleClose}>
                <CloseIcon />
              </Button>
            </div>
            <Divider />
            <div style={{ justifyContent: "center", display: "flex" }}>
              <Button> {`Project deadline: ${deadLine}`}</Button>
            </div>
            <Divider />
            {
              isAdmin &&
             <form className={classes.drawerForm} onSubmit={(e) => onSubmit(e)}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Add board title"
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Add board description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className={classes.date}>
                  <KeyboardDatePicker
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    label="Deadline"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </div>
              </MuiPickersUtilsProvider>
              <Button type="submit" fullWidth variant="contained" color="primary">
                Submit
              </Button>
            </form>
            }
          </div>
      </Drawer>
    </div>
  );
};

export default BoardDrawer;
