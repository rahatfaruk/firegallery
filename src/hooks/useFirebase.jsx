import { useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { fbAuth, fbStorage } from "../../firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function useFirebase() {
  const [loading, setLoading] = useState(true)

  // # create user
  const fbCreateUser = async (email, password, displayName, photoURL) => {
    setLoading(true)
    const credential = await createUserWithEmailAndPassword(fbAuth, email, password)
    await updateProfile(credential.user, {displayName, photoURL})
    setLoading(false)
    return credential
  }
  
  // # sign in
  const fbSignIn = async (email, password) => {
    setLoading(true)
    const credential = await signInWithEmailAndPassword(fbAuth, email, password)
    setLoading(false)
    return credential
  }
  
  // # logout
  const fbSignOut = async () => {
    setLoading(true)
    await signOut(fbAuth)
    setLoading(false)
  }

  // # upload image (into firebase-storage) and get url
  const fbUploadImageNdGetUrl = async (pathName, file) => {
    setLoading(true)
    // create file path ref for firebase storage
    const filePathRef = ref(fbStorage, pathName )
    // upload
    const uploadResult = await uploadBytes(filePathRef, file)
    const url = await getDownloadURL(filePathRef)

    setLoading(false)
    return {uploadResult, url}
  }

  return { loading, fbCreateUser, fbSignIn, fbSignOut, fbUploadImageNdGetUrl }
}

export default useFirebase;