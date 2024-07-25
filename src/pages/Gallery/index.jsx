import { useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { fbDatabase } from "../../../firebase.config";
import ImageBox from "./ImageBox";
import Loading from "../../comps/Loading";
import Upload from "./Upload";

function Gallery() {
  const [gallery, setGallery] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // get (realtime) all photos from database
  useEffect(() => {
    const cancelOnValue = onValue(ref(fbDatabase, 'images'), (snapshot) => {
      setIsLoading(true)
      const data = []
      snapshot.forEach(childSnap => {
        data.push({ id: childSnap.key, ...childSnap.val() })
      })

      setGallery(data)
      setIsLoading(false)
    })

    // clear effect
    return () => cancelOnValue()
  }, [])

  if (isLoading) { return <Loading /> }
  return (
    <section className="px-4">
      <div className="max-w-screen-xl mx-auto py-8">
        <h3 className="text-lg font-semibold mb-2">My Gallery:</h3>

        <Upload />

        {gallery.length < 1 ?
          <p className="text-xl text-gray-500">Empty gallery! Start by uploading a photo!</p> :
          <div className="grid justify-center md:grid-cols-2 lg:grid-cols-4 gap-4">
            {gallery.map(img => <ImageBox key={img.id} img={img} /> )}
          </div>
        }
      </div>
    </section>
  );
}

export default Gallery;
