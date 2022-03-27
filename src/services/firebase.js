import { firebaseConfig, showKeys } from "./config";
import { initializeApp } from "firebase/app";
import axios from "axios"
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
    updateDoc,
    doc
} from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    let user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    console.log(user)
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
      });
    }
    console.log(user.displayName)
    console.log(user.email)
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
    signOut(auth);
  };

const getGenreMap = async (user) => {
  if (!user) return undefined

  const userQuery = query(collection(db, "users"), where("uid", "==", user.uid));
  const docs = (await getDocs(userQuery)).docs[0]
  

  user["fb_id"] = docs.id 

  return docs.data().genres || {}

}

const updateGenreMap = async (user, map) => {
  if (!user) return

  console.log(await map)

  const docRef = doc(db, 'users', user.fb_id);

  const docs = await updateDoc(docRef, {
    genres: await map
  })
}

export async function genRecommends(user){
  //based on genre_map numbers pick movies with user's top rated genre
  let genre_map = getGenreMap(user)
  let highVal = -99999999 //might want to change to an element's value in the map
  let highKey = Object.keys(genre_map)[0]
  for(let e in Object.keys(genre_map)){
    //if e.val > highest then e.val = highest
    if(genre_map[e] > highVal){
      highVal = genre_map[e]
      highKey = e
    }
  }
  //highkey should contain the genre_id of the favorite genre
  let resp = await axios.get(`https://api.watchmode.com/v1/list-titles/?apiKey=${showKeys.watchmode}&source_ids=203,57&limit=20&genres=${highKey}`)

  return resp.data
}

export {
    auth,
    db,
    signInWithGoogle,
    logout,
    getGenreMap,
    updateGenreMap
  };
