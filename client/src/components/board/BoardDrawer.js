import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CloseIcon from '@material-ui/icons/Close';
// import DateFilter from '../other/DateFilter';
import { editBoard } from '../../actions/board';
import { TextField, Button, Divider, Drawer, Grid  } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import useStyles from '../../utils/drawerStyles';
import axios from 'axios';
import { saveAs } from 'file-saver';

const BoardDrawer = () => {
  const classes = useStyles();
  const { user } = useSelector((state) => state.auth);
  const board = useSelector((state) => state.board.board);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(board.title);
  const [description, setDescription] = useState(board.description);
  const [selectedDate, handleDateChange] = useState(board.selectedDate);
  const [startDate, setStartDate] = useState(new Date());
  const [finishDate, setFinishDate] = useState(new Date());
  const [isShownDatePicker, setIsShownDatePicker] = useState(true);
  const dispatch = useDispatch();

  const boardMembers = useSelector((state) => state.board.board.members);
  const activity = useSelector((state) => state.board.board.activity);
  const cardsOfBoard = useSelector((state) => state.board.board.cardObjects);
  const listsOfBoard = useSelector((state) => state.board.board.listObjects);
  const boardDescription = useSelector((state) => state.board.board.description);
  const boardTitle = useSelector((state) => state.board.board.title);
  const boardDeadline = useSelector((state) => state.board.board.selectedDate);

  const filteredActivity = activity.filter((item) => new Date(item.date) >= new Date(startDate) && new Date(item.date) <=  new Date(finishDate))

  const [documentPdf, setDocumentPdf ] = useState([]);

  useEffect(() => {
    setDocumentPdf([
      boardMembers, filteredActivity, cardsOfBoard, boardDescription, listsOfBoard, boardTitle, boardDeadline
    ])
  }, [startDate, finishDate])


  const showDatePicker = () => {
     setIsShownDatePicker(isShownDatePicker === true ? false : true )
     setStartDate(new Date());
     setFinishDate(new Date());

  }

  const handleStartDate = (date) => {
     setStartDate(date);
  };

  const handleFinishDate = (date) => {
     setFinishDate(date);
  };


  const createAndDownloadPdf = async () => {
    await axios.post('/api/create-pdf', documentPdf )
      .then(() => axios.get('/api/create-pdf/fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'newPdf.pdf');
      })
  }
  // eslint-disable-next-line array-callback-return
  const boardMember = boardMembers.filter((item) => {
    if(user.name === item.name ) {
      return boardMembers;
    }
  });

  const status = boardMember.map(({isAdmin}) => {
    return isAdmin
  })

  const [isAdmin] = status;

  const handleClose = () => {
    setOpen(false);
    setTitle(board.title);
    setDescription(board.description);
    handleDateChange(board.selectedDate);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(editBoard( board._id, { title, description, selectedDate }));
  };

  const deadLine =  new Date(selectedDate).toLocaleDateString("ru-RU").split("/")

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
              isAdmin ? (
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
                  label="Change board description"
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
                <Divider />
                <div style={{ marginBottom: "1rem"}}>
                {isShownDatePicker ?
                  (
                    <div>
                        <Button onClick={showDatePicker}  size="small" variant="contained">
                          Choose range
                        </Button>
                    </div>
                  ) : (
                <div className={classes.dateFilter} >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container justify="flex-start">
                      <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="dd/MM/yyyy"
                          margin="normal"
                          label="from"
                          value={startDate}
                          onChange={handleStartDate}
                      />
                      </Grid>
                    </MuiPickersUtilsProvider>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container justify="flex-start">
                      <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="dd/MM/yyyy"
                          margin="normal"
                          label="to "
                          value={finishDate}
                          onChange={handleFinishDate}
                      />
                      </Grid>
                    </MuiPickersUtilsProvider>
                    <Button onClick={showDatePicker}>
                      <CloseIcon />
                    </Button>
                </div>
              )
          }
          </div>
                  <div className={classes.reportButton}>
                    <Button
                      onClick={createAndDownloadPdf}
                      size="medium"
                      variant="contained"
                    >
                      Download a report
                    </Button>
                  </div>
                </form>
                ) : (
                <form className={classes.drawerForm}>
                  <TextField
                    disabled
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Board title"
                    value={title}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    disabled
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Board description"
                    value={description}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <MuiPickersUtilsProvider
                  utils={DateFnsUtils}>
                    <div className={classes.date}>
                      <KeyboardDatePicker
                        disabled
                        variant="inline"
                        inputVariant="outlined"
                        label="Deadline"
                        fullWidth
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        readOnly
                      />
                    </div>
                  </MuiPickersUtilsProvider>
                  <Divider />
                <div style={{ marginBottom: "1rem"}}>
                {isShownDatePicker ?
                  (
                    <div>
                        <Button onClick={showDatePicker}  size="small" variant="contained">
                          Choose range
                        </Button>
                    </div>
                  ) : (
                <div className={classes.dateFilter} >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container justify="flex-start">
                      <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="dd/MM/yyyy"
                          margin="normal"
                          label="from"
                          value={startDate}
                          onChange={handleStartDate}
                      />
                      </Grid>
                    </MuiPickersUtilsProvider>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container justify="flex-start">
                      <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="dd/MM/yyyy"
                          margin="normal"
                          label="to "
                          value={finishDate}
                          onChange={handleFinishDate}
                      />
                      </Grid>
                    </MuiPickersUtilsProvider>
                    <Button onClick={showDatePicker}>
                      <CloseIcon />
                    </Button>
                </div>
              )
          }
          </div>
                  <div className={classes.reportButton}>
                    <Button
                      onClick={createAndDownloadPdf}
                      size="medium"
                      variant="contained"
                    >
                      Download a report
                    </Button>
                  </div>
                </form>
                )
              }
          </div>
      </Drawer>
    </div>
  );
};

export default BoardDrawer;
