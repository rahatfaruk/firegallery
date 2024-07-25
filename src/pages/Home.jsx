import { ChevronDoubleRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

function Home() {
  return (  
    <section className="px-4 bg-gradient-to-b from-blue-200 to-white">
      <div className="max-w-screen-xl mx-auto py-10 md:py-14 text-center">
        {/* content */}
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl capitalize font-semibold">Host images for your web project</h2>
          <p className="mt-4 text-base md:text-lg text-gray-600">Upload your images from your local computer to the cloud and use image-url for your web project. You can manage your images however you like!</p>

          <Link to={'/gallery'} className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-md bg-blue-600 text-white font-bold text-lg hover:opacity-85 transition-opacity cursor-pointer shadow-md"> Go To Gallery <ChevronDoubleRight className="" /> </Link>
        </div>

        {/* img */}
        <div>
          <img src="/upload-img.svg" className="p-4 mx-auto mt-12 bg-white border border-blue-300 rounded-md shadow-lg" alt="upload image photo" />
        </div>
      </div>
    </section>
  );
}

export default Home;