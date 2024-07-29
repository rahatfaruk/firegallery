import { useState } from "react";

function SelectAlbum({selectedAlbum, setSelectedAlbum}) {
  const [albums, setAlbums] = useState([])

  // get all album


  return (
    <div>
      <h3 className="mt-6 text-gray-600 font-semibold text-lg">Select an album:</h3>
      <div className="mt-2">
        <div className="flex gap-3 flex-wrap">
          <button onClick={() => setSelectedAlbum('')} className="px-3 py-1 border rounded-md shadow hover:border-blue-600 text-blue-600 border-blue-600 font-semibold">personal</button>
          <button className="px-3 py-1 border rounded-md shadow hover:border-blue-600 text-gray-500 ">sajek</button>
          <button className="px-3 py-1 border rounded-md shadow hover:border-blue-600 text-gray-500 ">sylhet</button>
        </div>

        <p className="hidden text-gray-600">No album available!</p>
      </div>
    </div>
  );
}

export default SelectAlbum;