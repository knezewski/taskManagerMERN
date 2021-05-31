import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MuiPickersUtilsProvider, KeyboardDatePicker  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Grid, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from '../../utils/modalStyles';


const DateFilter = ({items}) => {

   const classes = useStyles();
   const [startDate, setStartDate] = useState(new Date());
   const [finishDate, setFinishDate] = useState(new Date());
   const [isShownDatePicker, setIsShownDatePicker] = useState(true);
   const dispatch = useDispatch();


   const filteredActivity = items.filter((item) => new Date(item.date) >= new Date(startDate) && new Date(item.date) <=  new Date(finishDate))

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

   return (
      <>
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
      </>
   )
}

export default DateFilter;
