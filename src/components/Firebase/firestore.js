import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, startAfter, endAt, startAt, query, setDoc, limit, where } from 'firebase/firestore';
import { db } from './firebase';
import { getDownloadURL } from './storage';
import { geohashForLocation, geohashQueryBounds, distanceBetween } from 'geofire-common';
const FOOD_COLLECTION = 'foods';
const HISTORY_COLLECTION = 'history'

export function addHistory(uid, foodId, email){
  const createDate = new Date();
  const ref = doc(db, HISTORY_COLLECTION, uid+"_"+foodId);
  // addDoc(collection(db, HISTORY_COLLECTION), { uid, foodId,  email, createDate});
  setDoc(ref, { uid, foodId,  email, createDate});
}


export function addFood(uid, bestBeforeDate, pickupBeforeDate, description, address, secondaryAddress, title, imageBucket, geometry, tags) {
  const createDate = new Date();
  const geoHash = geohashForLocation([geometry.latitude, geometry.longitude]);
  geometry.geoHash = geoHash;
  const modifyDate = createDate;
  addDoc(collection(db, FOOD_COLLECTION), { uid, bestBeforeDate, pickupBeforeDate, createDate, modifyDate, description, address, secondaryAddress, title, imageBucket, geometry, tags });
}

// Updates receipt with @docId with given information.
export function updateFood(docId, uid, bestBeforeDate, pickupBeforeDate, description, address, secondaryAddress, title, imageBucket, geometry, createDate, tags) {
  const modifyDate = new Date();
  const geoHash = geohashForLocation([geometry.latitude, geometry.longitude]);
  geometry.geoHash = geoHash;
  setDoc(doc(db, FOOD_COLLECTION, docId), { uid, bestBeforeDate, pickupBeforeDate, createDate, modifyDate, description, address, secondaryAddress, title, imageBucket, geometry, tags});
}

// Deletes receipt with given @id.
export function deleteFood(id) {
  deleteDoc(doc(db, FOOD_COLLECTION, id));
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
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    /* next line works with strings and numbers, 
     * and you may want to customize it to your needs
     */
    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result * sortOrder;
  }
}


export async function getFoodsByGeo(setFoods, setIsLoadingFoods, radiusInM, center, tags) {
  console.log("radius", radiusInM)
  const bounds = geohashQueryBounds(
    center,
    radiusInM
  );

  const promises = [];

  for (const bound of bounds) {
    let q = query(
      collection(db, FOOD_COLLECTION)
    );
    if(tags.length > 0){
      q = query(q, where("tags", "array-contains-any", tags))
    }
    q = query(q, 
        orderBy("geometry.geoHash"),
        orderBy("createDate", "desc"),
        startAt(bound[0]),
        endAt(bound[1])
    )
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
  for (const doc of matchingDocs) {
    const food = doc.data();
    console.log("all foods", food)
    const distanceInM = distanceBetween([food["geometry"]["latitude"], food["geometry"]["longitude"]], center)
    if (distanceInM*1000 <= radiusInM){
      const distance = distanceInM * 0.621371 // in miles
      allFoods.push({
        ...food,
        createDate: food['createDate'].toDate(),
        id: doc.id,
        distance: distance.toFixed(2),
        imageUrl: await getDownloadURL(food['imageBucket']),
      });
    }
  }

  allFoods.sort(dynamicSort("distance"));
  setFoods(allFoods);
  setIsLoadingFoods(false);
}


export async function getHistory(uid){
  let allHistory = [];
  const historyQuery = query(collection(db, HISTORY_COLLECTION), where("uid", "==", uid));
  const snapshots = await getDocs(historyQuery);
  for (const doc of snapshots.docs) {
    const his = doc.data();
    const foodSnapshot = await getDoc(doc(db, FOOD_COLLECTION, his['foodId']));
    if (foodSnapshot.exists()) {
      allHistory.push({
        createDate: his['createDate'].toDate(),
        food: foodSnapshot.data(),
        email: his['email'],
      });
    }
  }
  return allHistory;
}