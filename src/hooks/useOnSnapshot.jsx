import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthProvider"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { fbFirestore } from "../../firebase.config"

function useOnSnapshot(pathName, queryAlbum) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const {user} = useContext(AuthContext)

  // get all data
  useEffect(() => {
    let queryRef = collection(fbFirestore, 'app', user.uid, pathName)
    if (queryAlbum) {
      queryRef = query(queryRef, where("albumName", "==", queryAlbum))
    }
    // get realtime data; set data
    const unsubSnap = onSnapshot(queryRef, snapshot => {
      const dataList = []
      snapshot.forEach(doc => dataList.push( {id:doc.id, ...doc.data()} ))
      setData(dataList)
      setLoading(false)
    })

    // cleanup
    return unsubSnap;
  }, [queryAlbum])

  return {data, loading}
}

export default useOnSnapshot;