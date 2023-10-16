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
const DEFAULT_FILE_NAME = "No file selected";

const DEFAULT_FORM_STATE = {
  address: "",
  bestBeforeDate: null,
  pickupBeforeDate: null,
  createDate: null,
  fileName: DEFAULT_FILE_NAME,
  file: null,
  imageBucket: "",
  imageUrl: "",
  description: "",
  title: "",
};

const AddFoodDialog = (props) => {
  const isEdit = Object.keys(props.edit).length > 0;
  const { authUser } = useAuth();
  const [formFields, setFormFields] = useState(isEdit ? props.edit : DEFAULT_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (props.showDialog) {
      setFormFields(isEdit ? props.edit : DEFAULT_FORM_STATE);
    }
  }, [props.edit, props.showDialog]);

  const isDisabled = () => formFields.fileName === DEFAULT_FILE_NAME || !formFields.date || !formFields.bestBeforeDate
    || formFields.description.length === 0 || formFields.address.length === 0;

  const updateFormField = (event, field) => {
    setFormFields(prevState => ({ ...prevState, [field]: event.target.value }));
  };

  const setFileData = (target) => {
    const file = target.files[0];
    setFormFields(prevState => ({ ...prevState, fileName: file.name }));
    setFormFields(prevState => ({ ...prevState, file }));
  };

  const closeDialog = () => {
    setIsSubmitting(false);
    props.onCloseDialog();
  };

  // Store receipt information to Storage and Firestore
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      
      if (isEdit) {
        // Check whether image was changed - fileName will be not null
        if (formFields.fileName) {
          // Store image into Storage
          await replaceImage(formFields.file, formFields.imageBucket);
        }
        //   await updateReceipt(formFields.id, authUser.uid, formFields.date, formFields.locationName, formFields.address, formFields.items, formFields.amount, formFields.imageBucket);
      } else {
        // Adding
        // Store image into Storage
        const bucket = await uploadImage(formFields.file, authUser.uid);
        //Store data into Firestore
        await addFood(authUser.uid, formFields.bestBeforeDate, formFields.pickupBeforeDate, formFields.description,formFields.address, formFields.title, bucket);
      }
      props.onSuccess(isEdit ? FOOD_IMAGE_ENUM.edit : FOOD_IMAGE_ENUM.add);
    } catch (error) {
      console.log(error)
      props.onError(isEdit ? FOOD_IMAGE_ENUM.edit : FOOD_IMAGE_ENUM.add);
    }

    // Clear all form data
    closeDialog();
  };

  return (
    <Dialog
      onClose={closeDialog}
      open={props.showDialog}
      maxWidth="md"
      fullWidth={true}
      component="form"
    >
      <DialogTitle>
        {isEdit ? "EDIT" : "ADD"} Sharing Food:
      </DialogTitle>
      <DialogContent sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.8em',
          padding: '0.6em',
        }}>
        <TextField label="Title" variant="standard" type="text" onChange={(event) => updateFormField(event, 'title')} />
        <TextField label="Address" variant="standard" type="text" onChange={(event) => updateFormField(event, 'address')} />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DemoContainer components={['DateTimePicker']}>
            <DateTimePicker
              label="Pickup Before Date"
              value={formFields.pickupBeforeDate}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
              onChange={(newDate) => {
                console.log(newDate)
                setFormFields(prevState => ({...prevState, pickupBeforeDate: newDate}));
              }}
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
                    value={formFields.bestBeforeDate}
                    minDate={new Date()}
                    onChange={(newDate) => {
                      setFormFields(prevState => ({...prevState, bestBeforeDate: newDate}));
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
        </Stack>
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={5}
          value={formFields.description}
          onChange={(event) => updateFormField(event, 'description')} 
        />
        <Stack direction="row" spacing={2}>
          {(isEdit && !formFields.fileName) && <Avatar alt="food image" src={formFields.imageUrl} />}
          <Button variant="outlined" component="label" color="secondary">
            Upload Image
            <input type="file" hidden onInput={(event) => { setFileData(event.target) }} />
          </Button>
          <Typography>{formFields.fileName}</Typography>
        </Stack>
      </DialogContent>
      
      <DialogActions>
        {isSubmitting ?
          <Button color="secondary" variant="contained" disabled={true}>
            Submitting...
          </Button> :
          <Button color="secondary" variant="contained" onClick={handleSubmit}>
            Submit
          </Button>}
      </DialogActions>
    </Dialog>
  );
};

export default AddFoodDialog;
