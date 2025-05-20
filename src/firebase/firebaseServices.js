// Firebase SDK imports

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { auth, storage } from "./firebase";
import { api, sendTokenToBackend } from "../../api/api";

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
    provider.addScope("https://www.googleapis.com/auth/userinfo.email");

    const result = await signInWithPopup(auth, provider);

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.idToken;
    const user = result.user;
console.log(user);

    const backendResponse = await sendTokenToBackend(user);
    console.log(backendResponse.data);
    
    return backendResponse;
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
  }
};

// ✅ STORAGE FUNCTIONS
export const uploadFile = async (path, file) => {
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
};
