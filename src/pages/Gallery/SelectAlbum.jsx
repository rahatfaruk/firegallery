import { collection, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { fbFirestore } from "../../../firebase.config";
import { AuthContext } from "../../context/AuthProvider";

function SelectAlbum({selectedAlbum, setSelectedAlbum}) {
  const [albums, setAlbums] = useState([])
  // const [selectedAlbum, setSelectedAlbum] = useState(null)
  const {user} = useContext(AuthContext)

  // get all album
  useEffect(() => {
    // get realtime albums; show these
    const unsubSnap = onSnapshot(collection(fbFirestore, 'app', user.uid, 'albums'), snapshot => {
      const albumsData = []
      snapshot.forEach(doc => albumsData.push( {id:doc.id, ...doc.data()} ))
      setAlbums(albumsData)
    })

    // cleanup
    return unsubSnap;
  }, [])


  return (
    <div>
      <h3 className="mt-6 text-gray-600 font-semibold text-lg">Select an album:</h3>
      <div className="mt-2">
        {albums?.length > 0 ? (
        <div className="flex gap-3 flex-wrap">
          {albums.map(album => 
            <button 
              key={album.id}
              onClick={() => setSelectedAlbum(album)} 
              className={ `px-3 py-1 border rounded-md shadow hover:border-blue-600 ${selectedAlbum?.albumName === album.albumName ? 'text-blue-600 border-blue-600 font-semibold' : 'text-gray-500'}` }
            >{album.albumName}</button>
          )}
        </div>
        ) :
        <p className="hidden text-gray-600">No album available! Create one!</p>
        }

      </div>
    </div>
  );
}

export default SelectAlbum;