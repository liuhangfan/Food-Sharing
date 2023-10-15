import { FOOD_IMAGE_ENUM } from "../components/FoodItem/foodImageEnum";
import { deleteImage } from "../components/Firebase/storage";
import { useAuth } from "../components/Firebase/auth";
import { Alert, Button, CircularProgress, Container, Dialog, DialogContent, DialogActions, Divider, IconButton, Snackbar, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import AddFoodDialog from "../components/FoodItem/AddFoodDialog";

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
    // const router = useRouter();
    const [action, setAction] = useState(FOOD_IMAGE_ENUM.none);

      // State involved in loading, setting, deleting, and updating receipts
    const [isLoadingFoodImages, setIsLoadingFoodImages] = useState(true);
    const [deleteImageId, setDeleteImageId] = useState("");
    const [deleteFoodImageBucket, setDeleteFoodImageBucket] = useState("");
    const [foodImages, setFoodImages] = useState([]);
    const [updateFoodImages, setUpdateFoodImages] = useState({});

      // State involved in snackbar
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [showSuccessSnackbar, setSuccessSnackbar] = useState(false);
    const [showErrorSnackbar, setErrorSnackbar] = useState(false);

      // Listen for changes to loading and authUser, redirect if needed
    // useEffect(() => {
    //     if (!isLoading && !authUser) {
    //     router.push('/');
    //     }
    // }, [authUser, isLoading])

    // Get receipts once user is logged in
    // useEffect(async () => {
    //     if (authUser) {
    //     const unsubscribe = await getReceipts(authUser.uid, setReceipts, setIsLoadingReceipts);
    //     return () => unsubscribe();
    //     }
    // }, [authUser])
      // Sets appropriate snackbar message on whether @isSuccess and updates shown receipts if necessary
    const onResult = async (receiptEnum, isSuccess) => {
        setSnackbarMessage(isSuccess ? SUCCESS_MAP[receiptEnum] : ERROR_MAP[receiptEnum]);
        isSuccess ? setSuccessSnackbar(true) : setErrorSnackbar(true);
        setAction(FOOD_IMAGE_ENUM.none);
    }

    const onClickAdd = () => {
        setAction(FOOD_IMAGE_ENUM.add);
        setUpdateFoodImages({});
      }
    
      const onUpdate = (foodImages) => {
        setAction(FOOD_IMAGE_ENUM.edit);
        setUpdateFoodImages(foodImages);
      }
    
      const onClickDelete = (id, imageBucket) => {
        setAction(FOOD_IMAGE_ENUM.delete);
        setDeleteImageId(id);
        setDeleteFoodImageBucket(imageBucket);
      }
    
      const resetDelete = () => {
        setAction(FOOD_IMAGE_ENUM.none);
        setDeleteImageId("");
      }
    
      // Delete image from Storage
      const onDelete = async () => {
        let isSucceed = true;
        try {
          await deleteImage(deleteFoodImageBucket);
        } catch (error) {
          isSucceed = false;
        }
        resetDelete();
        onResult(FOOD_IMAGE_ENUM.delete, isSucceed);
      }



      return (
        <div>

            <title>My Sharing Foods:</title>

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
                FOODS:
            </Typography>
            <IconButton aria-label="edit" color="secondary" onClick={onClickAdd}>
                <AddIcon />
            </IconButton>
            </Stack>
            {/* { receipts.map((receipt) => (
            <div key={receipt.id}>
                <Divider light />
                <ReceiptRow receipt={receipt}
                            onEdit={() => onUpdate(receipt)}
                            onDelete={() => onClickDelete(receipt.id, receipt.imageBucket)} />
            </div>)
            )} */}
        </Container>
        <AddFoodDialog edit={updateFoodImages}
                        showDialog={action === FOOD_IMAGE_ENUM.add || action === FOOD_IMAGE_ENUM.edit}
                        onError={(receiptEnum) => onResult(receiptEnum, false)}
                        onSuccess={(receiptEnum) => onResult(receiptEnum, true)}
                        onCloseDialog={() => setAction(FOOD_IMAGE_ENUM.none)}>
        </AddFoodDialog>
        {/* <Dialog open={action === RECEIPTS_ENUM.delete} onClose={resetDelete}>
            <Typography variant="h4" className={styles.title}>DELETE EXPENSE</Typography>
            <DialogContent>
                <Alert severity="error">This will permanently delete your receipt!</Alert>
            </DialogContent>
            <DialogActions sx={{ padding: '0 24px 24px'}}>
            <Button color="secondary" variant="outlined" onClick={resetDelete}>
                Cancel
            </Button>
            <Button color="secondary" variant="contained" onClick={onDelete} autoFocus>
                Delete
            </Button>
            </DialogActions>
        </Dialog> */}
        </div>
    )
  }

export default MyFoodPage;