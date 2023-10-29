import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore'; 
import { db } from './firebase';
import { getDownloadURL } from './storage';

const FOOD_COLLECTION = 'foods';

export function addFood(uid,bestBeforeDate,pickupBeforeDate,description,address,title,imageBucket, location){
    const createDate = new Date();
    addDoc(collection(db, FOOD_COLLECTION),{uid,bestBeforeDate,pickupBeforeDate, createDate, description,address,title,imageBucket, location});
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


export async function getFoodsByUser(uid){
    const foodQuery = query(collection(db, FOOD_COLLECTION), where("uid", "==", uid), orderBy("createDate", "desc"));
    const querySnapshot = await getDocs(foodQuery)
    let allFoods = [];
    for(const documentSnapshot of querySnapshot.docs){
        const food = documentSnapshot.data();
        allFoods.push({
            ...food,
            createDate: food['createDate'].toDate(), 
            id: documentSnapshot.id,
            imageUrl: await getDownloadURL(food['imageBucket']),
        });
    }
    return allFoods;
}