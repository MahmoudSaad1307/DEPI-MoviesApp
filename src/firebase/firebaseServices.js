// Firebase SDK imports
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { auth, db, storage } from "./firebase";

// ✅ AUTH FUNCTIONS
export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
  return signOut(auth);
};

export const onUserStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// ✅ FIRESTORE FUNCTIONS
export const addDocument = async (collectionName, data) => {
  return await addDoc(collection(db, collectionName), data);
};

export const getDocuments = async (collectionName) => {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getDocument = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const updateDocument = async (collectionName, id, newData) => {
  const docRef = doc(db, collectionName, id);
  return await updateDoc(docRef, newData);
};

export const deleteDocument = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id);
  return await deleteDoc(docRef);
};

// ✅ STORAGE FUNCTIONS
export const uploadFile = async (path, file) => {
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
};
