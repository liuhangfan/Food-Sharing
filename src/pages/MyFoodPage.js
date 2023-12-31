import { FOOD_IMAGE_ENUM } from "../components/FoodItem/foodImageEnum";
import { deleteImage } from "../components/Firebase/storage";
import { useAuth } from "../components/Firebase/auth";
import { Alert, Button, CircularProgress, Container, Dialog, DialogContent, DialogActions, Divider, Grid, TextareaAutosize, IconButton, Snackbar, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import AddFoodDialog from "../components/FoodItem/AddFoodDialog";
import { getFoods, deleteFood } from "../components/Firebase/firestore";
import { useNavigate } from "react-router-dom";
import * as ROUTES from '../constants/routes.js';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { TextField } from '@mui/material';

const ADD_SUCCESS = "Image was successfully added!";
const ADD_ERROR = "Image was not successfully added!";
const EDIT_SUCCESS = "Image was successfully updated!";
const EDIT_ERROR = "Image was not successfully updated!";
const DELETE_SUCCESS = "Image successfully deleted!";
const DELETE_ERROR = "Image not successfully deleted!";

const SUCCESS_MAP = {
    [FOOD_IMAGE_ENUM.add]: ADD_SUCCESS,
    [FOOD_IMAGE_ENUM.edit]: EDIT_SUCCESS,
    [FOOD_IMAGE_ENUM.delete]: DELETE_SUCCESS
  }
  
  const ERROR_MAP = {
    [FOOD_IMAGE_ENUM.add]: ADD_ERROR,
    [FOOD_IMAGE_ENUM.edit]: EDIT_ERROR,
    [FOOD_IMAGE_ENUM.delete]: DELETE_ERROR
  }


const MyFoodPage =() => {
    const { authUser, isLoading } = useAuth();
    const [action, setAction] = useState(FOOD_IMAGE_ENUM.none);

      // State involved in loading, setting, deleting, and updating receipts
    const [isLoadingFoods, setIsLoadingFoods] = useState(true);
    const [deleteFoodId, setDeleteFoodId] = useState("");
    const [deleteFoodImageBucket, setDeleteFoodImageBucket] = useState("");
    const [foods, setFoods] = useState([]);
    const [updateFoods, setUpdateFoods] = useState({});

      // State involved in snackbar
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [showSuccessSnackbar, setSuccessSnackbar] = useState(false);
    const [showErrorSnackbar, setErrorSnackbar] = useState(false);
    let navigate = useNavigate();
    // Listen for changes to loading and authUser, redirect if needed
    useEffect(() => {
        if (!isLoading && !authUser) {
        navigate(ROUTES.LANDING);
        }
    }, [authUser, isLoading])

    const listenFoods = async () => {
      if (authUser) {
        //await getFoods(authUser.uid, setFoods, setIsLoadingFoods);
       const unsubscribe = await getFoods(authUser.uid, setFoods, setIsLoadingFoods);
       return () => unsubscribe();
      }
    }
    // Get foods once user is logged in
    useEffect(() => {
      listenFoods();
    }, [authUser])

      // Sets appropriate snackbar message on whether @isSuccess and updates shown receipts if necessary
    const onResult = async (foodEnum, isSuccess) => {
        setSnackbarMessage(isSuccess ? SUCCESS_MAP[foodEnum] : ERROR_MAP[foodEnum]);
        isSuccess ? setSuccessSnackbar(true) : setErrorSnackbar(true);
        setAction(FOOD_IMAGE_ENUM.none);
    }

    const onClickAdd = () => {
        setAction(FOOD_IMAGE_ENUM.add);
        setUpdateFoods({});
      }
    
      const onUpdate = (food) => {
        setAction(FOOD_IMAGE_ENUM.edit);
        setUpdateFoods(food);
      }
    
      const onClickDelete = (id, imageBucket) => {
        setAction(FOOD_IMAGE_ENUM.delete);
        setDeleteFoodId(id);
        setDeleteFoodImageBucket(imageBucket);
      }
    
      const resetDelete = () => {
        setAction(FOOD_IMAGE_ENUM.none);
        setDeleteFoodId("");
      }
    
      // Delete image from Storage
      const onDelete = async () => {
        let isSucceed = true;
        try {
          await deleteFood(deleteFoodId);
          await deleteImage(deleteFoodImageBucket);
        } catch (error) {
          isSucceed = false;
        }
        resetDelete();
        onResult(FOOD_IMAGE_ENUM.delete, isSucceed);
      }

      return (
        <div>
        <Container>
            <Snackbar open={showSuccessSnackbar} autoHideDuration={1500} onClose={() => setSuccessSnackbar(false)}
                    anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
            <Alert onClose={() => setSuccessSnackbar(false)} severity="success">{snackbarMessage}</Alert>
            </Snackbar>
            <Snackbar open={showErrorSnackbar} autoHideDuration={1500} onClose={() => setErrorSnackbar(false)}
                    anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
            <Alert onClose={() => setErrorSnackbar(false)} severity="error">{snackbarMessage}</Alert>
            </Snackbar>
            <Stack direction="row" sx={{ paddingTop: "1.5em" }}>
            <Typography variant="h4" sx={{ lineHeight: 2, paddingRight: "0.5em" }}>
                My Sharing FOODS:
            </Typography>
            <IconButton aria-label="edit" color="secondary" onClick={onClickAdd}>
                <AddIcon />
            </IconButton>
            </Stack>
            <Grid container spacing={2}>
                {foods.map((food) => (
                  <Grid item key={food.id} xs={12} sm={6} md={4}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{
                          paddingTop: '75%', // 4:3 aspect ratio (adjust as needed)
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                      <CardMedia
                        component="img"
                        alt={food.title}
                        
                        image={food.imageUrl}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      </div>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="div">
                          {food.title}
                        </Typography>
                        <TextareaAutosize
                          maxRows={3}
                          value={food.description}
                          readOnly
                          style={{
                            width: '100%',
                            resize: 'vertical',
                            overflowY: 'auto',
                          }} />
                      </CardContent>
                      <CardActions>
                        <Button size="small" onClick={()=>{onUpdate(food)}} >edit</Button>
                        <Button size="small" onClick={()=>{onClickDelete(food.id, food.imageBucket)}}>delete</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
        </Container>
        <AddFoodDialog edit={updateFoods}
                        showDialog={action === FOOD_IMAGE_ENUM.add || action === FOOD_IMAGE_ENUM.edit}
                        onError={(foodEnum) => onResult(foodEnum, false)}
                        onSuccess={(foodEnum) => onResult(foodEnum, true)}
                        onCloseDialog={() => setAction(FOOD_IMAGE_ENUM.none)}>
        </AddFoodDialog>
        <Dialog open={action === FOOD_IMAGE_ENUM.delete} onClose={resetDelete}>
            <Typography variant="h4">DELETE FOOD</Typography>
            <DialogContent>
                <Alert severity="error">This will permanently delete your food!</Alert>
            </DialogContent>
            <DialogActions sx={{ padding: '0 24px 24px'}}>
            <Button color="secondary" variant="outlined" onClick={resetDelete}>
                Cancel
            </Button>
            <Button color="secondary" variant="contained" onClick={onDelete} autoFocus>
                Delete
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    )
  }

export default MyFoodPage;