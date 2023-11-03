import { FOOD_IMAGE_ENUM } from "../components/FoodItem/foodImageEnum";
import { deleteImage } from "../components/Firebase/storage";
import { useAuth } from "../components/Firebase/auth";
import { Alert, Button, CircularProgress, Container, Dialog, DialogContent, DialogActions, Divider, Grid, TextareaAutosize, IconButton, Snackbar, Stack, Typography } from '@mui/material';
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


const AllFoodsPage =() => {

  const [foods, setFoods] = useState([]);
  const [isLoadingFoods, setIsLoadingFoods] = useState(true);
  const [currentFood, setCurrentFood] = useState(null);
  
  const [location, setLocation] = useState({
    lat: 0,
    lon: 0
  });
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          setLocation({
            lat: 0,
            lon: 0
          });
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser.');
      setLocation({
        lat: 0,
        lon: 0
      });
    }
  }, []);

  //Get foods once user is logged in
  useEffect(() => {
      getFoodsByGeo(setFoods, setIsLoadingFoods, 50 * 1000, [location["lat"],location["lon"]]);
  }, [location])

    return (
      <div>

      <Container>
          <Stack direction="row" sx={{ paddingTop: "1.5em" }}>
          <Typography variant="h4" sx={{ lineHeight: 2, paddingRight: "0.5em" }}>
              All Sharing FOODS:
          </Typography>
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
      </Container>
      <ViewFoodDialog food={currentFood}
                      showDialog={currentFood != null}
                      onCloseDialog={() => setCurrentFood(null)}>
      </ViewFoodDialog>
      </div>
  )
}

export default AllFoodsPage;