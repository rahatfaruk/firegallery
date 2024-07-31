import { Copy, Trash3Fill } from "react-bootstrap-icons";
import useFirebase from "../../hooks/useFirebase";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-toastify";

function ImageCard({img}) {
  const {user} = useContext(AuthContext)
  const { fbDeleteDoc } = useFirebase()

  // copy to clipboard
  const copyPhotoURL = () => {
    navigator.clipboard.writeText(img.photoURL)
  }

  // delete img
  const handleDeleteImage = async () => {
    const isConfirm = confirm('are you sure to delete the image?')
    if (isConfirm) {
      await fbDeleteDoc(`/app/${user.uid}/images/${img.id}`)
      toast.info('image deleted')
    }
  }

  return (  
    <div className="relative w-full max-w-lg self-center border rounded-md shadow-md">
      <div title={`${Math.trunc(img.size/1000)} kb`}>
        <img src={img.photoURL} className="w-full h-52 object-cover rounded-t-md" alt="" />
      </div>

      <div className="flex items-center justify-between">
        <h3 className="p-2 text-sm">{img.name}</h3>

        <div className="flex gap-1 mr-1">
          <button onClick={copyPhotoURL} className="px-1 py-1 rounded-md text-blue-500" title="copy url"> <Copy /> </button>
          
          <button onClick={handleDeleteImage} className="px-1 py-1 rounded-md text-red-500" title="delete this image"> <Trash3Fill /> </button>
        </div>
      </div>
    </div>
  );
}

export default ImageCard;