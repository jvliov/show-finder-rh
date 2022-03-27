import { firebaseConfig } from "./config";
import { initializeApp } from "firebase/app";
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
  console.log(userQuery)
  const docs = (await getDocs(userQuery)).docs[0]
  
  console.log(docs.id)

  user["fb_id"] = docs.id 

  return docs.data().genres || {}

}

const updateGenreMap = async (user, map) => {
  if (!user) return

  console.log("User", user)

  const userQuery = query(collection(db, "users"), where("uid", "==", user.uid));
  const docRef = doc(db, 'users', user.fb_id);

  console.log(docRef)
  const docs = await updateDoc(docRef, {
    genres: map
  })
}

export {
    auth,
    db,
    signInWithGoogle,
    logout,
    getGenreMap,
    updateGenreMap
  };
