
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  DocumentData,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { auth, db, storage } from "./firebase";

// ✅ Authentication
export const registerUser = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
  return signOut(auth);
};

export const onUserStateChange = (
  callback: (user: User | null) => void
) => {
  return onAuthStateChanged(auth, callback);
};

// ✅ Firestore
export const addDocument = async (
  collectionName: string,
  data: Record<string, any>
) => {
  return await addDoc(collection(db, collectionName), data);
};

export const getDocuments = async (
  collectionName: string
): Promise<DocumentData[]> => {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getDocument = async (
  collectionName: string,
  id: string
): Promise<DocumentData | null> => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const updateDocument = async (
  collectionName: string,
  id: string,
  newData: Record<string, any>
) => {
  const docRef = doc(db, collectionName, id);
  return await updateDoc(docRef, newData);
};

export const deleteDocument = async (
  collectionName: string,
  id: string
) => {
  const docRef = doc(db, collectionName, id);
  return await deleteDoc(docRef);
};

// ✅ Storage
export const uploadFile = async (
  path: string,
  file: File
): Promise<string> => {
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
};
