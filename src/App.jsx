import Gallery from "./comps/Gallery";
import Upload from "./comps/Upload";

function App() {
  return (  
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="mb-4">
        <h2 className="text-3xl mb-2">FireGallery</h2>
        <p className="text-lg text-gray-600">Manage your images with firebase</p>
      </div>

      <Upload />
      <Gallery />
    </div>
  );
}

export default App;