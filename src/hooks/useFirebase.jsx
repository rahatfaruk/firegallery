import { useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { fbAuth, fbStorage, fbFirestore } from "../../firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";

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
  
  // # sign in
  const fbGoogleSignIn = async () => {
    setLoading(true)
    const provider = new GoogleAuthProvider()
    const credential = await signInWithPopup(fbAuth, provider)
    setLoading(false)
    return credential
  }
  
  // # logout
  const fbSignOut = async () => {
    setLoading(true)
    await signOut(fbAuth)
    setLoading(false)
  }

  // # storage: upload image and get url
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

  // # firestore
  // add doc
  const fbAddDoc = async (path, data) => {
    const pathArr = path.slice(1,).split('/')
    const docRef = await addDoc( collection(fbFirestore, ...pathArr), data )
    return docRef
  }

  // delete doc
  const fbDeleteDoc = async(docPath) => {
    const pathArr = docPath.slice(1,).split('/')
    await deleteDoc(doc(fbFirestore, ...pathArr))
  }


  return { loading, fbCreateUser, fbGoogleSignIn, fbSignIn, fbSignOut, fbUploadImageNdGetUrl, fbAddDoc, fbDeleteDoc }
}

export default useFirebase;