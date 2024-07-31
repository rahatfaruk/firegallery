import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import CreateAlbum from "./CreateAlbum";
import Albums from "./Albums";
import UploadImage from "./UploadImage";
import Images from "./Images";

function Gallery() {
  const [selectedAlbum, setSelectedAlbum] = useState('')
  const {user} = useContext( AuthContext )


  // if (isLoading) { return <Loading /> }
  return (
    <section className="px-4">
      <div className="max-w-screen-xl mx-auto py-6">
        <h2 className="text-2xl font-semibold">Gallery</h2>
        
        <CreateAlbum user={user} />
        <Albums selectedAlbum={selectedAlbum} setSelectedAlbum={setSelectedAlbum} />

        {selectedAlbum && (<>
          <div className="mt-8 mb-3 flex items-center gap-2">
            <h3 className="text-blue-600 font-semibold">{selectedAlbum.albumName} album: </h3>
          </div>
          <UploadImage selectedAlbum={selectedAlbum} />
          <Images selectedAlbum={selectedAlbum} setSelectedAlbum={setSelectedAlbum} />
        </>)}
        
      </div>
    </section>
  );
}

export default Gallery;
