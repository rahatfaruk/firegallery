import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import CreateAlbum from "./CreateAlbum";
import SelectAlbum from "./SelectAlbum";

function Gallery() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAlbum, setSelectedAlbum] = useState('')
  const {user} = useContext( AuthContext )


  // if (isLoading) { return <Loading /> }
  return (
    <section className="px-4">
      <div className="max-w-screen-xl mx-auto py-6">
        <h2 className="text-2xl font-semibold">Gallery</h2>
        
        <CreateAlbum />
        <SelectAlbum selectedAlbum={selectedAlbum} setSelectedAlbum={setSelectedAlbum} />
        
      </div>
    </section>
  );
}

export default Gallery;
