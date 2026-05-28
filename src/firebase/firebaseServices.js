// Google OAuth via @react-oauth/google (replaces Firebase signInWithPopup)
// NOTE: Firebase Auth is no longer used for sign-in. Firestore/Storage still work.

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";
import { sendTokenToBackend } from "../../api/api";

/**
 * Returns a Google OAuth credential flow using @react-oauth/google.
 * Usage in a component:
 *   const login = useGoogleSignIn({ onSuccess, onError });
 *   <button onClick={login}>Sign in with Google</button>
 *
 * This does NOT use apis.google.com — it loads from accounts.google.com
 * which works in regions where Google APIs are otherwise blocked.
 */
export { useGoogleLogin } from "@react-oauth/google";

/**
 * After receiving the Google credential response (idToken),
 * send it to the backend to verify and create/find the user.
 */
export const signInWithGoogleToken = async (credentialResponse) => {
  const { access_token: accessToken } = credentialResponse;
  if (!accessToken) throw new Error("No Access Token received from Google");

  const backendResponse = await sendTokenToBackend({ accessToken });
  return backendResponse;
};

// ✅ STORAGE FUNCTIONS
export const uploadFile = async (path, file) => {
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
};
