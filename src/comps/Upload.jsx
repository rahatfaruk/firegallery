import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ref as refDB, push } from "firebase/database";
import { fbDatabase, fbStorage } from "../../firebase.config";

function Upload() {

  // handler: choose local image and upload it to firebase storage and db
  const handleUploadImage = async e => {
    e.preventDefault()

    const chosenImage = e.target.imagesInp.files[0]

    // validate: if no photo is selected - show alert, return
    if (!chosenImage) {
      alert('please, select an image!')
      return
    }
    
    // create file path ref for firebase storage
    const filePathRef = ref(fbStorage, `images/${chosenImage.name}`)
    // upload
    const uploadResult = await uploadBytes(filePathRef, chosenImage)
    const imageUrl = await getDownloadURL(filePathRef)

    // push image info into database
    await push( refDB(fbDatabase, `images`), {
      imageUrl,
      name: uploadResult.metadata.name,
      fullPath: uploadResult.metadata.fullPath,
      size: uploadResult.metadata.size,
    })

    // reset form; show success msg
    e.target.reset()
    alert('image uploaded!')
  }


  return (  
    <div className="mb-6 border p-4 shadow-md">
      <h3 className="text-lg font-semibold mb-2">Upload new photo:</h3>
      <form onSubmit={handleUploadImage}>
        <input type="file" name="imagesInp" className="block mb-3" />
        <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors">Upload</button>
      </form>
    </div>
  );
}

export default Upload;