import { ref, remove } from "firebase/database";
import { deleteObject, ref as refStorage } from "firebase/storage";
import { Copy, Trash3Fill } from "react-bootstrap-icons";
import { fbDatabase, fbStorage } from "../../firebase.config";

function ImageBox({img}) {

  // delete a photo onClick delete-btn
  const handleDeleteImage = async () => {
    // re-confirm deletion
    const isConfirmed = confirm('Are you sure to delete this image?')

    if (isConfirmed) {
      // delete image-info from database
      await remove(ref(fbDatabase, `images/${img.id}`))

      // delete image-file from storage
      await deleteObject(refStorage(fbStorage, img.fullPath))
      alert('Deleted successfully!')
    }
  }

  // copy img-url on clipboard onClick copy-btn
  const copyImageUrl = () => {
    navigator.clipboard.writeText(img.imageUrl)
  }


  return (
    <div key={img.id} className="relative border rounded-md shadow-md">
      <div title={`${Math.trunc(img.size/1000)} kb`}>
        <img src={img.imageUrl} className="w-full h-52 object-cover rounded-t-md" alt="" />
      </div>

      <div className="flex items-center justify-between">
        <h3 className="p-2 text-sm">{img.name}</h3>

        <div className="flex gap-1 mr-1">
          <button onClick={copyImageUrl} className="px-1 py-1 rounded-md text-blue-500" title="copy url"> <Copy /> </button>
          
          <button onClick={handleDeleteImage} className="px-1 py-1 rounded-md text-red-500" title="delete this image"> <Trash3Fill /> </button>
        </div>
      </div>
    </div>
  );
}

export default ImageBox