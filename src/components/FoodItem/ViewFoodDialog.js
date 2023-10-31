import React, { useState, useEffect } from 'react';
import { Avatar, Button, Dialog, DialogActions, DialogContent, Stack, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useAuth } from '../Firebase/auth'; // Adjust the import path if needed
import { replaceImage, uploadImage } from '../Firebase/storage'; // Adjust the import path if needed
import { FOOD_IMAGE_ENUM } from './foodImageEnum';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { addFood} from '../Firebase/firestore';
import dayjs from 'dayjs';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
const ViewFoodDialog = (props) => {
  if(props.food === null) return null;
  return (
    <Dialog
      onClose={props.onCloseDialog}
      open={props.showDialog}
      maxWidth="md"
      fullWidth={true}
      component="form"
    >
      <DialogTitle>
        {props.food.title}
      </DialogTitle>
      
      <DialogContent sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.8em',
          padding: '0.6em',
        }}>
        
        <TextField id="standard-read-only-input" label="Address" variant="standard" defaultValue={props.food.address} InputProps={{ readOnly: true}} />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DemoContainer components={['DateTimePicker']}>
            <DateTimePicker
              label="Pickup Before Date"
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
              defaultValue={new Date(props.food.pickupBeforeDate['seconds']*1000)}
              readOnly={true}
            />
          </DemoContainer>
      </LocalizationProvider>
        <DialogTitle sx={{
            fontSize: 20,
          }}>
        Food detail:
      </DialogTitle>
        <Stack>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label="Best Before Date"
                    defaultValue={new Date(props.food.bestBeforeDate['seconds']*1000)}
                    readOnly={true}
                  />
                </DemoContainer>
              </LocalizationProvider>
        </Stack>
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={5}
          defaultValue={props.food.description}
          InputProps={{ readOnly: true}}
        />
        {/* <Stack direction="row" spacing={2}>
          {(isEdit && !formFields.fileName) && <Avatar alt="food image" src={formFields.imageUrl} />}
          <Button variant="outlined" component="label" color="secondary">
            Upload Image
            <input type="file" hidden onInput={(event) => { setFileData(event.target) }} />
          </Button>
          <Typography>{formFields.fileName}</Typography>
        </Stack> */}
      </DialogContent>
      
      <DialogActions>
        {/* {isSubmitting ?
          <Button color="secondary" variant="contained" disabled={true}>
            Submitting...
          </Button> : */}
          <Button color="secondary" variant="contained">
            Request Contact
          </Button>
      </DialogActions>

    </Dialog>
  );
};

export default ViewFoodDialog;
