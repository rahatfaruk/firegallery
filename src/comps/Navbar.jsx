import { Link } from "react-router-dom";

function Navbar() {
  const user = null 

  return (  
    <nav className="px-4">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-6 py-4 border-b">
        <h1 className="text-blue-600 text-xl md:text-2xl font-semibold"><span className="inline-block bg-blue-600 text-white px-2 rounded-md">FG</span> FireGallery</h1>

        <>
          {user ? 
            <div className="flex gap-3 items-center">
              <img src={user.photoUrl} className="rounded-full size-8 border border-blue-600" alt={user.displayName} title={user.displayName} />
              <button className="inline-block px-3 py-1.5 rounded-md bg-red-700 text-white text-sm hover:bg-red-800 transition-colors"> Logout </button>
            </div> : 
            <div>
              <Link to={'/login'} className="inline-block px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-500 transition-colors"> Login </Link>
            </div>
          }
        </>
      </div>
    </nav>
  );
}

export default Navbar;