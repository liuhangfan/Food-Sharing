import React, { useState, useEffect } from 'react';
import { Avatar, Button, Dialog, DialogActions, DialogContent, Stack, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useAuth } from '../Firebase/auth'; // Adjust the import path if needed
// import { addReceipt, updateReceipt } from '../firebase/firestore';
import { replaceImage, uploadImage } from '../Firebase/storage'; // Adjust the import path if needed
import { FOOD_IMAGE_ENUM } from './foodImageEnum';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import DialogTitle from '@mui/material/DialogTitle';


const DEFAULT_FILE_NAME = "No file selected";

const DEFAULT_FORM_STATE = {
  address: "",
  date: null,
  bestBeforeDate: null,
  fileName: DEFAULT_FILE_NAME,
  file: null,
  imageBucket: "",
  imageUrl: "",
  description: "",
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

        // Store data into Firestore
        //   await addReceipt(authUser.uid, formFields.date, formFields.locationName, formFields.address, formFields.items, formFields.amount, bucket);
      }
      props.onSuccess(isEdit ? FOOD_IMAGE_ENUM.edit : FOOD_IMAGE_ENUM.add);
    } catch (error) {
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
      {/* <Typography variant="h4" sx={{paddingLeft: '0.6em'}}>
        {isEdit ? "EDIT" : "ADD"} My Sharing Foods:
      </Typography> */}
      <DialogTitle>
        {isEdit ? "EDIT" : "ADD"} My Sharing Foods:
      </DialogTitle>
      <DialogContent sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.8em',
          padding: '0.6em',
        }}>
        <Stack direction="row" spacing={2}>
          {(isEdit && !formFields.fileName) && <Avatar alt="receipt image" src={formFields.imageUrl} />}
          <Button variant="outlined" component="label" color="secondary">
            Upload Receipt
            <input type="file" hidden onInput={(event) => { setFileData(event.target) }} />
          </Button>
          <Typography>{formFields.fileName}</Typography>
        </Stack>
        <Stack>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label="Best Before Date"
                    format="M/D/YYYY"
                    value={formFields.date}
                    onChange={(newDate) => {
                      setFormFields(prevState => ({...prevState, bestBeforeDate: newDate}));
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
        </Stack>
        <TextField label="address" variant="standard" type="text" onChange={(event) => updateFormField(event, 'address')} />
        {/* <TextField label="Description" variant="standard" value={formFields.description} onChange={(event) => updateFormField(event, 'description')} /> */}
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={5}
          value={formFields.description}
          onChange={(event) => updateFormField(event, 'description')} 
        />
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
