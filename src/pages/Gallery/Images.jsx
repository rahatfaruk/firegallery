import Loading from "../../comps/Loading";
import useOnSnapshot from "../../hooks/useOnSnapshot";
import ImageCard from "./ImageCard";

function Images({selectedAlbum}) {
  const {data: images, loading} = useOnSnapshot('images', selectedAlbum.albumName)

  if (loading) { return <Loading /> }
  return (  
    <div className="mt-6">
      {images.length < 1 ?
        <p className="text-gray-600">No images available! Upload one!</p> :
        <div className="grid justify-center md:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map(img => <ImageCard key={img.id} img={img} /> )}
        </div>
      }
    </div>
  );
}

export default Images;