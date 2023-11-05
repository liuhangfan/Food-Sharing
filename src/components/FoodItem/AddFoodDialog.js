import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Button, Dialog, DialogActions, DialogContent, Stack, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useAuth } from '../Firebase/auth';
import { replaceImage, uploadImage } from '../Firebase/storage';
import { FOOD_IMAGE_ENUM } from './foodImageEnum';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { addFood, updateFood } from '../Firebase/firestore';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { usePlacesWidget } from "react-google-autocomplete";
import AddressAutoComplete from '../GoogleMap/AddressAutoComplete'
import { getGeofromPlaceId } from '../GoogleMap/GeoCode'
const DEFAULT_FILE_NAME = "No file selected";

const DEFAULT_FORM_STATE = {
  address: null,
  secondaryAddress: "",
  bestBeforeDate: null,
  pickupBeforeDate: null,
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
  const [placeId, setPlaceId] = useState("");
  const [formFields, setFormFields] = useState(isEdit ? props.edit : DEFAULT_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (props.showDialog) {
      setFormFields(isEdit ? props.edit : DEFAULT_FORM_STATE);
    }
  }, [props.edit, props.showDialog]);

  // Check whether any of the form fields are unedited
  const isDisabled = () => formFields.fileName === DEFAULT_FILE_NAME || !formFields.pickupBeforeDate || !formFields.bestBeforeDate
    || !formFields.bestBeforeDate || formFields.description.length === 0 || formFields.title.length === 0;
  // || formFields.address.length === 0;

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
    let geometry = formFields.geometry;
    // if place changed
    if (placeId.length != 0) {
      const geo = await getGeofromPlaceId(placeId);
      geometry = {
        latitude: geo.lat,
        longitude: geo.lng
      };
    }
    try {
      if (isEdit) {
        // Check whether image was changed - fileName will be not null
        if (formFields.fileName) {
          // Store image into Storage
          await replaceImage(formFields.file, formFields.imageBucket);
        }
        await updateFood(formFields.id, authUser.uid, formFields.bestBeforeDate, formFields.pickupBeforeDate, formFields.description, formFields.address, formFields.secondaryAddress, formFields.title, formFields.imageBucket, geometry, formFields.createDate);
      } else {
        // Adding
        // Store image into Storage
        const bucket = await uploadImage(formFields.file, authUser.uid);
        //Store data into Firestore
        await addFood(authUser.uid, formFields.bestBeforeDate, formFields.pickupBeforeDate, formFields.description, formFields.address, formFields.secondaryAddress, formFields.title, bucket, geometry);
      }
      props.onSuccess(isEdit ? FOOD_IMAGE_ENUM.edit : FOOD_IMAGE_ENUM.add);
    } catch (error) {
      console.log(error)
      props.onError(isEdit ? FOOD_IMAGE_ENUM.edit : FOOD_IMAGE_ENUM.add);
    }
    // Clear all form data
    closeDialog();
  };
  console.log("form:", formFields)
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
        <TextField id="outlined-basic" label="Title" variant="outlined" type="text" value={formFields.title} onChange={(event) => updateFormField(event, 'title')} />
        <AddressAutoComplete
          label="Pickup Address"
          defaultValue={formFields.address}
          onChange={(data) => {
            if (data && data.description && data.place_id) {
              setFormFields(prevState => ({ ...prevState, address: data }));
              setPlaceId(data.place_id);
            }
          }}
        />
        <TextField id="outlined-basic" variant="outlined" label="Apt, suite, etc. (optional)" type="text" value={formFields.secondaryAddress} onChange={(event) => updateFormField(event, 'secondaryAddress')} />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DemoContainer components={['DateTimePicker']}>
            <DateTimePicker
              label="Pickup Before Date"
              defaultValue={isEdit && formFields.pickupBeforeDate ? new Date(formFields.pickupBeforeDate['seconds']*1000) : null}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
              onChange={(newDate) => {
                setFormFields(prevState => ({ ...prevState, pickupBeforeDate: newDate }));
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <DialogTitle sx={{
          fontSize: 20,
        }}>
          Food detail:
        </DialogTitle>

        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={5}
          value={formFields.description}
          onChange={(event) => updateFormField(event, 'description')}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="Best Before Date"
              defaultValue={isEdit && formFields.bestBeforeDate? new Date(formFields.bestBeforeDate['seconds']*1000) : null}
              minDate={new Date()}
              onChange={(newDate) => {
                setFormFields(prevState => ({ ...prevState, bestBeforeDate: newDate }));
              }}
            />
          </DemoContainer>
        </LocalizationProvider>

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
          <Button color="secondary" variant="contained" onClick={handleSubmit} disabled={isDisabled()}>
            Submit
          </Button>}
      </DialogActions>
    </Dialog>
  );
};

export default AddFoodDialog;
