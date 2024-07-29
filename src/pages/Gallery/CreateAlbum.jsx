import { toast } from "react-toastify";

function CreateAlbum() {
  // create new album
  const handleSubmit = async e => {
    e.preventDefault()

    // get album-name; validate
    const newAlbumName = e.target.albumName.value.trim()
    if (!newAlbumName.length) {
      toast.warn('type album name!')
    }
    
    console.log(newAlbumName);
    // send req to create album
    
  }


  return (
    <form onSubmit={handleSubmit} className="flex mt-4">
      <input type="text" className="px-3 py-1 rounded-l-md border border-gray-300 bg-gray-100" name="albumName" placeholder="Create an album; e.g. tour" />
      <button className="px-3 py-1 rounded-r-md bg-blue-600 text-white hover:bg-blue-500 transition-colors disabled:opacity-75"> Create </button>
    </form>
  );
}

export default CreateAlbum;