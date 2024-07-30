import { toast } from "react-toastify";
import useFirebase from "../../hooks/useFirebase";

function CreateAlbum({user}) {
  const { fbAddDoc } = useFirebase()

  // create new album
  const handleSubmit = async e => {
    e.preventDefault()

    // get album-name; validate
    const newAlbumName = e.target.albumName.value.trim()
    if (!newAlbumName.length) {
      toast.warn('type album name!')
    }
    
    // send req to create album
    await fbAddDoc(`/app/${user.uid}/albums`, {album: newAlbumName})
    // clear form ; show msg
    e.target.reset()
    toast.success('album created seccessfully!')
  }


  return (
    <form onSubmit={handleSubmit} className="flex mt-4">
      <input type="text" className="px-3 py-1 rounded-l-md border border-gray-300 bg-gray-100" name="albumName" placeholder="Create an album; e.g. tour" />
      <button className="px-3 py-1 rounded-r-md bg-blue-600 text-white hover:bg-blue-500 transition-colors disabled:opacity-75"> Create </button>
    </form>
  );
}

export default CreateAlbum;