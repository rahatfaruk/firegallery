import { useContext } from "react";
import Loading from "../../comps/Loading";
import { AuthContext } from "../../context/AuthProvider";
import useFirebase from "../../hooks/useFirebase";
import useOnSnapshot from "../../hooks/useOnSnapshot";
import ImageCard from "./ImageCard";
import { toast } from "react-toastify";

function Images({selectedAlbum, setSelectedAlbum}) {
  const {data: images, loading} = useOnSnapshot('images', selectedAlbum.albumName)
  const {user} = useContext(AuthContext)
  const {fbDeleteDoc} = useFirebase()

  // delete album
  const handleDeleteAlbum = async () => {
    const isConfirm = confirm('are you sure to delete the album?')
    if (isConfirm) {
      // delete album doc from albums collection
      await fbDeleteDoc(`/app/${user.uid}/albums/${selectedAlbum.id}`)
      setSelectedAlbum(null)
      toast.info('album deleted')
    }
  }

  if (loading) { return <Loading /> }
  return (  
    <div className="mt-6">
      {images.length < 1 ?
        <p className="text-gray-600">
          No images available! Upload image; or <button onClick={handleDeleteAlbum} className="inline text-red-700 font-semibold hover:opacity-80">Delete album</button>
        </p> :
        <div className="grid justify-items-center md:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map(img => <ImageCard key={img.id} img={img} /> )}
        </div>
      }
    </div>
  );
}

export default Images;