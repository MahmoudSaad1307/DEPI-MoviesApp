// Firebase SDK imports

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { auth, storage } from "./firebase";

// ✅ AUTH FUNCTIONS
// export const registerUser = (email, password) => {
//   return createUserWithEmailAndPassword(auth, email, password);
// };

// export const loginUser = (email, password) => {
//   return signInWithEmailAndPassword(auth, email, password);
// };

// export const logoutUser = () => {
//   return signOut(auth);
// };

// export const onUserStateChange = (callback) => {
//   return onAuthStateChanged(auth, callback);
// };

// // ✅ FIRESTORE FUNCTIONS
// export const addDocument = async (collectionName, data) => {
//   return await addDoc(collection(db, collectionName), data);
// };

// export const getDocuments = async (collectionName) => {
//   const snapshot = await getDocs(collection(db, collectionName));
//   return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
// };

// export const getDocument = async (collectionName, id) => {
//   const docRef = doc(db, collectionName, id);
//   const docSnap = await getDoc(docRef);
//   return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
// };

// export const updateDocument = async (collectionName, id, newData) => {
//   const docRef = doc(db, collectionName, id);
//   return await updateDoc(docRef, newData);
// };

// export const deleteDocument = async (collectionName, id) => {
//   const docRef = doc(db, collectionName, id);
//   return await deleteDoc(docRef);
// };
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
    provider.addScope("https://www.googleapis.com/auth/userinfo.email");

    const result = await signInWithPopup(auth, provider);

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.idToken;
    const user = result.user;

    const backendResponse = await sendTokenToBackend(user, token);
    return backendResponse;
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
  }
};
const sendTokenToBackend = async (firebaseUser, idToken) => {
  try {
    const response = await fetch("/api/auth/google-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken,
        displayName: firebaseUser.displayName,
        email: firebaseUser.email,
        uid: firebaseUser.uid,
        photoURL: firebaseUser.photoURL,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to authenticate with backend");
    }

    return await response.json();
  } catch (error) {
    console.error("Backend authentication error:", error);
    throw error;
  }
};

// ✅ STORAGE FUNCTIONS
export const uploadFile = async (path, file) => {
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
};
