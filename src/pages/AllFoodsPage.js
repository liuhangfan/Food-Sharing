import { FOOD_IMAGE_ENUM } from "../components/FoodItem/foodImageEnum";
import { deleteImage } from "../components/Firebase/storage";
import { useAuth } from "../components/Firebase/auth";
import { Alert, Button, CircularProgress, Container, Dialog, DialogContent, DialogActions, Divider, Grid, TextareaAutosize, IconButton, Snackbar, Stack, Typography, Autocomplete, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import ViewFoodDialog from "../components/FoodItem/ViewFoodDialog";
import { getFoodsByGeo } from "../components/Firebase/firestore";
import { useNavigate } from "react-router-dom";
import * as ROUTES from '../constants/routes.js';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useLocation } from "../components/Geometry/location";
import TagFilter from "../components/Filter/TagFilter";
import DistanceFilter from "../components/Filter/DistanceFilter";

const AllFoodsPage =() => {
  const {authUser , isLoading} = useAuth();
  const {latitude, longitude} = useLocation()
  const [foods, setFoods] = useState([]);
  const [isLoadingFoods, setIsLoadingFoods] = useState(true);
  const [currentFood, setCurrentFood] = useState(null);
  const [isFetch, setIsFetch] = useState(false);
  const [tags, setTags] = useState([]);
  const [miles, setMiles] = useState(20);
  // const [location, setLocation] = useState(null);

  let navigate = useNavigate();
  // Listen for changes to loading and authUser, redirect if needed
  useEffect(() => {
      if (!isLoading && !authUser) {
      navigate(ROUTES.LOG_IN);
      }
  }, [authUser, isLoading])
  
  //Get foods once user is logged in
  useEffect(() => {
    console.log(miles);

      if(isLoadingFoods && !isFetch){
        setIsFetch(true);
        console.log(latitude, longitude)
        getFoodsByGeo(setFoods, setIsLoadingFoods, miles * 1609.34, [latitude,longitude], tags);
        setIsFetch(false);
      }
  }, [tags, miles])

    return (
      <div>
      <Container>
          <Typography variant="h4" sx={{ lineHeight: 2, paddingRight: "1em" }}>
                  Sharing FOODS:
          </Typography>
          <Divider></Divider>
          <TagFilter handleChange={(tags)=>{
            setTags(tags);
            setIsLoadingFoods(true);
            console.log(tags);
          }} />
          <DistanceFilter value={miles} handleChange={(miles) => {
            setMiles(miles);
            setIsLoadingFoods(true);
          }} />
          <Divider sx={{paddingBottom: "1em"}}></Divider>
          {isLoadingFoods ? (
            <CircularProgress color="inherit" sx={{ marginLeft: '50%', marginTop: '5%' }} />
          ) : (
            <Grid sx={{paddingTop:"1em"}}container spacing={2}>
              {foods.map((food) => (
                <Grid item key={food.id} xs={12} sm={6} md={4}>
                  <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
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
                        <Typography>
                          {food.distance} miles
                        </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => setCurrentFood(food)}>Learn More</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
      </Container>
      <ViewFoodDialog food={currentFood}
                      showDialog={currentFood != null}
                      onCloseDialog={() => setCurrentFood(null)}>
      </ViewFoodDialog>
      </div>
  )
}

export default AllFoodsPage;