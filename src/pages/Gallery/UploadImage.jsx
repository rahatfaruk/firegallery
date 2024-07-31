import { useContext } from "react";
import { toast } from "react-toastify";
import { Upload } from "react-bootstrap-icons";
import useFirebase from "../../hooks/useFirebase";
import { AuthContext } from "../../context/AuthProvider";

function UploadImage({selectedAlbum}) {
  const { fbUploadImageNdGetUrl, fbAddDoc } = useFirebase()
  const {user} = useContext(AuthContext)

  // handler: choose local image and upload it to firebase storage and db
  const handleUploadImage = async e => {
    const imgFile = e.target.files[0]

    // ## validate image: 
    // > if no photo is selected
    if (!imgFile) { return }
    // > image file types
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
    if ( !validImageTypes.includes(imgFile.type) ) {
      toast.error(`Invalid image type! Please choose jpeg, jpg, png, gif, webp or svg file`);
      return
    }

    try {
      // upload img into storage & get url
      const {url} = await fbUploadImageNdGetUrl(`/images/${user.uid}/${imgFile.name}`, imgFile)

      // database: create imgInfo obj; insert img info
      const imgInfo = {
        photoURL: url,
        name: imgFile.name,
        size: imgFile.size,
        type: imgFile.type,
        createdAt: Date.now(),
        albumId: selectedAlbum.id,
        albumName: selectedAlbum.albumName,
      }

      await fbAddDoc(`/app/${user.uid}/images`, imgInfo)

      e.target.value = null
      toast.success('uploaded successfully!')
    } catch (error) {
      toast.error(error.message)
    }
  }


  return (
    <>
      <label className="block">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors hover:cursor-pointer disabled:opacity-75">Upload image <Upload/> </span>
        <input onChange={handleUploadImage} type="file" name="imagesInp" className="hidden" />
      </label>
    </>
  )
}

export default UploadImage;