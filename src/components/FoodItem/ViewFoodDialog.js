import React, { useState, useEffect } from 'react';
import { Avatar, Button, Dialog, DialogActions, DialogContent, Stack, TextField, Typography, Alert } from '@mui/material';
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
import { getUserEmailByUID } from '../Firebase/auth';
import CopyToClipboard from "react-copy-to-clipboard";
import LoadingButton from '@mui/lab/LoadingButton';
import SearchIcon from '@mui/icons-material/Search';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
const ViewFoodDialog = (props) => {
  const [showContact, setShowContactAlert] = useState(null);
  const [showContactSuccess, setShowContactSuccessAlert] = useState("success");
  const [loading, setLoading] = useState(false);
  const [requestDisable, setRequestDisable] = useState(false);

  if(props.food === null) return null;


  const handleGetEmail = async (UID) => {
    setLoading(true);
    try {
        const userEmail = await getUserEmailByUID(UID);
        setShowContactSuccessAlert("success");
        setShowContactAlert(userEmail);
        setRequestDisable(true);
      } catch (error) {
        console.error('Error:', error);
        setShowContactAlert("Something wrong, try it later");
        setShowContactSuccessAlert("warning")
      }
    setLoading(false);
  }
  
  const reset = () => {
    setShowContactAlert(null)
    setShowContactSuccessAlert("success");
    setLoading(false);
    setRequestDisable(false);
  }

  return (
    <Dialog
      onClose={() => {
        reset()
        props.onCloseDialog()
      }}
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
        
        <TextField id="standard-read-only-input" label="Pick-Up Address" variant="standard" defaultValue={props.food.address.description} InputProps={{ readOnly: true}} />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DemoContainer components={['DateTimePicker']}>
            <DateTimePicker
              label="Available Until Date"
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
              defaultValue={new Date(props.food.pickupBeforeDate['seconds']*1000)}
              readOnly={true}
            />
          </DemoContainer>
          {props.food.address.secondaryAddress && <TextField id="standard-read-only-input" label="Apt, suite, etc. (optional)" variant="standard" defaultValue={props.food.address.secondaryAddress} InputProps={{ readOnly: true}} />}
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
                    label="Food Expiry Date"
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
      </DialogContent>
      {showContact && <Alert severity={showContactSuccess} onClose={() => {
                                            setShowContactAlert(null)
                                            setRequestDisable(false);
                                        }}>
                         {/* {showContact} */}
                         {<CopyToClipboard
                    text={showContact}>
                        {/* <Button variant="text" size="small" endIcon={<ContentCopyIcon />}>
                            {showContact}
                        </Button> */}
                        <span>{showContact}</span>
                    </CopyToClipboard>}
                    </Alert>}
      <DialogActions>
          <LoadingButton
          size="small"
          onClick={() => handleGetEmail(props.food.uid)}
          endIcon={<SearchIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
          disabled={requestDisable}
        >
          <span>Request Contact</span>
        </LoadingButton>
      </DialogActions>
      
    </Dialog>
  );
};

export default ViewFoodDialog;
