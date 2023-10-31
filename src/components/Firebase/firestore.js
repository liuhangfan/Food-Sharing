import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, startAfter, endAt, startAt, query, setDoc, limit, where } from 'firebase/firestore'; 
import { db } from './firebase';
import { getDownloadURL } from './storage';
import { geohashForLocation, geohashQueryBounds, distanceBetween } from 'geofire-common';
const FOOD_COLLECTION = 'foods';



export function addFood(uid,bestBeforeDate,pickupBeforeDate,description,address,title,imageBucket, location){
    const createDate = new Date();
    const geoHash = geohashForLocation([location["lat"], location["lon"]]);
    addDoc(collection(db, FOOD_COLLECTION),{uid,bestBeforeDate,pickupBeforeDate, createDate, description,address,title,imageBucket, location, geoHash});
}


export async function getFoods(uid, setFoods, setIsLoadingFoods) {
    const foodQuery = query(collection(db, FOOD_COLLECTION), where("uid", "==", uid), orderBy("createDate", "desc"));
  
    const unsubscribe = onSnapshot(foodQuery, async (snapshot) => {
      let allFoods = [];
      for (const documentSnapshot of snapshot.docs) {
        const food = documentSnapshot.data();
        allFoods.push({
          ...food, 
          createDate: food['createDate'].toDate(), 
          id: documentSnapshot.id,
          imageUrl: await getDownloadURL(food['imageBucket']),
        });
      }
      setFoods(allFoods);
      setIsLoadingFoods(false);
    })
    return unsubscribe;
}

export async function getAllFoods(setFoods, setIsLoadingFoods) {
  const foodQuery = query(collection(db, FOOD_COLLECTION), orderBy("createDate", "desc"));

  const unsubscribe = onSnapshot(foodQuery, async (snapshot) => {
    let allFoods = [];
    for (const documentSnapshot of snapshot.docs) {
      const food = documentSnapshot.data();
      allFoods.push({
        ...food, 
        createDate: food['createDate'].toDate(), 
        id: documentSnapshot.id,
        imageUrl: await getDownloadURL(food['imageBucket']),
      });
    }
    setFoods(allFoods);
    setIsLoadingFoods(false);
  })
  return unsubscribe;
}

function dynamicSort(property) {
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      /* next line works with strings and numbers, 
       * and you may want to customize it to your needs
       */
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}

export async function getFoodsByGeo(setFoods, setIsLoadingFoods, radiusInM, center) {
  const bounds = geohashQueryBounds(
    center,
    radiusInM
  );

  const promises = [];

  for (const bound of bounds) {
    const q = query(
      collection(db, FOOD_COLLECTION),
      orderBy("geoHash"),
      orderBy("createDate", "desc"),
      startAt(bound[0]),
      endAt(bound[1])
    );
    promises.push(getDocs(q));
  }

  const snapshots = await Promise.all(promises);

  const matchingDocs = [];
  for (const snap of snapshots) {
    for (const doc of snap.docs) {
      // const lat = doc.get('lat');
      // const lng = doc.get('lng');

      // // We have to filter out a few false positives due to GeoHash
      // // accuracy, but most will match
      // const distanceInKm = geofire.distanceBetween([lat, lng], center);
      // const distanceInM = distanceInKm * 1000;
      // if (distanceInM <= radiusInM) {
        matchingDocs.push(doc);
      //}
    }
  }
  let allFoods = [];

  for (const doc of matchingDocs){
    console.log(doc);
    const food = doc.data();
    const distance = distanceBetween([food["location"]["lat"], food["location"]["lon"]], center) * 0.621371 // in miles
    allFoods.push({
      ...food, 
      createDate: food['createDate'].toDate(), 
      id: doc.id,
      distance: distance.toFixed(2),
      imageUrl: await getDownloadURL(food['imageBucket']),
    });
  }

  allFoods.sort(dynamicSort("distance"));
  setFoods(allFoods);
  setIsLoadingFoods(false);
}