import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { editCard, putComment } from '../../actions/board';
import { Modal, TextField, Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import CloseIcon from '@material-ui/icons/Close';
import MoveCard from './MoveCard';
import DeleteCard from './DeleteCard';
// import DateFilter from '../other/DateFilter';
import CardMembers from './CardMembers';
import Typography from '@material-ui/core/Typography';
import useStyles from '../../utils/modalStyles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import axios from 'axios';
// import { saveAs } from 'file-saver';

const CardModal = ({ cardId, open, setOpen, card, list }) => {
  const classes = useStyles();
  const { user } = useSelector((state) => state.auth);
  const [title, setTitle] = useState(card.title);
  const [level, setLevel] = useState('');
  const [comment, setComment] = useState('');
  const [description, setDescription] = useState(card.description);
  const [selectedDate, setSelectedDate] = useState(card.selectedDate);
  const [activityChunks] = useState(1);

  // variables for sending pdf
  // const members = card.members
  const listTitle = list.title

  const activity = useSelector((state) => state.board.board.activity);
  // const [documentPdf ] = useState([
  //   title, level, description, selectedDate, activity, members, listTitle
  // ]);

  const dispatch = useDispatch();

  const isAdmin = card?.admin[0].user;
  const currentUser = user._id;
  const isCardAdmin = isAdmin === currentUser;


  const handleChange = (event) => {
    setLevel(event.target.value);
  };

  const handleComment = (event) => {
    setComment(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    setTitle(card.title);
    setDescription(card.description);
    setSelectedDate(card.selectedDate);
  }, [card]);

  const onTitleDescriptionSubmit = async (e) => {
    e.preventDefault();
    dispatch(editCard(cardId, { title, description, selectedDate }));
  };

  const onCommentSubmit = async (e) => {
    e.preventDefault();
    dispatch(putComment({comment}));
  };

  // const createAndDownloadPdf = () => {
  //   axios.post('/api/create-pdf', documentPdf )
  //     .then(() => axios.get('/api/create-pdf/fetch-pdf', { responseType: 'blob' }))
  //     .then((res) => {
  //       const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

  //       saveAs(pdfBlob, 'newPdf.pdf');
  //     })
  // }


  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className={`${classes.paper} ${classes.cardModal}`}>
      <Typography variant="h6">Column: {listTitle}</Typography>
      {
        isCardAdmin ?
        <form onSubmit={(e) => onTitleDescriptionSubmit(e)}>
          <div className={classes.modalTop}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              multiline
              label='Card title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onTitleDescriptionSubmit(e)}
              className={classes.cardTitle}
            />
            <Button onClick={() => setOpen(false)}>
              <CloseIcon />
            </Button>
          </div>
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            multiline
            label='Card description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="flex-start">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                label="Deadline"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          {
            isCardAdmin &&
            <Button
              type='submit'
              variant='contained'
              color='primary'
              disabled={
                title === card.title &&
                (description === card.description ||
                  (description === '' && !card.description)) &&
                (selectedDate === card.selectedDate ||
                  (selectedDate === '' && !card.selectedDate))
              }
              className={classes.button}
            >
              Save Changes
            </Button>
          }
        </form> :
        <form>
          <div className={classes.modalTop}>
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              multiline
              label='Card title'
              value={title}
              className={classes.cardTitle}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            multiline
            label='Card description'
            value={description}
            InputProps={{
              readOnly: true,
            }}
          />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="flex-start">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  label="Deadline"
                  value={selectedDate}
                  readOnly
                />
              </Grid>
            </MuiPickersUtilsProvider>
        </form>
      }
        {
          isCardAdmin && <div>
            <div className={classes.modalSection}>
              <CardMembers card={card} />
              <div>
                <h3 className={classes.labelTitle}>Label</h3>
                <Select
                  className={classes.selectLevel}
                  value={level}
                  onChange={handleChange}
                  onBlur={async () => dispatch(editCard(cardId, { label: level }))}
                  >
                  <MenuItem onClick={async () => dispatch(editCard(cardId, { label: level }))} value="none">No label</MenuItem>
                  <MenuItem onClick={async () => dispatch(editCard(cardId, { label: level }))} value="Critical">Critical</MenuItem>
                  <MenuItem onClick={async () => dispatch(editCard(cardId, { label: level }))} value="High">High</MenuItem>
                  <MenuItem onClick={async () => dispatch(editCard(cardId, { label: level }))} value="Medium">Medium</MenuItem>
                  <MenuItem onClick={async () => dispatch(editCard(cardId, { label: level }))} value="Low">Low</MenuItem>
                </Select>
                {/* <Button
                  className={classes.noLabel}
                  variant='outlined'
                  onClick={async () => dispatch(editCard(cardId, { label: 'none' }))}
                >
                  No Label
                </Button> */}
              </div>
                {/* <div style={{ marginBottom: "1rem"}}>
                  <DateFilter
                    items={activity}
                  />
                </div>
                <div className={classes.reportButton}>
                  <Button
                    onClick={createAndDownloadPdf}
                    size="medium"
                    variant="contained"
                  >
                    Download a report
                  </Button>
                </div> */}
            </div>
            <div className={classes.modalSection}>
              <MoveCard cardId={cardId} setOpen={setOpen} thisList={list} />
              <div className={classes.modalBottomRight}>
                <DeleteCard cardId={cardId} setOpen={setOpen} list={list} />
              </div>
            </div>
          </div>
        }
        {
          isCardAdmin &&
            <div className={classes.commentContainer}>
              <form onSubmit={(e) => onCommentSubmit(e)}>
                <TextField
                  fullWidth
                  label="Comment"
                  variant="outlined"
                  value={comment}
                  onChange={handleComment}
                />
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  disabled={!comment}
                  className={classes.button}
                >
                  Post comment
                </Button>
              </form>
            </div>
        }
          <List>
                {activity.slice(0, activityChunks * 15).map((activity) => (
                  <ListItem key={activity._id}>
                    <ListItemText
                      primary={activity.text}
                      secondary={<Moment fromNow>{activity.date}</Moment>}
                    />
                  </ListItem>
                ))}
          </List>
        </div>
    </Modal>
  );
};

CardModal.propTypes = {
  cardId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
};

export default CardModal;
