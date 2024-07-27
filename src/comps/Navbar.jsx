import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import useFirebase from "../hooks/useFirebase";
import { AuthContext } from "../context/AuthProvider";

function Navbar() {
  const { fbSignOut } = useFirebase()
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  console.log(user);

  // logout
  const handleSignOut = async () => {
    await fbSignOut()
    toast.info('logged out!')
    navigate('/login')
  }

  return (  
    <nav className="px-4">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-6 py-4 border-b">
        <h1 className="text-blue-600 text-xl md:text-2xl font-semibold">
          <Link to={'/'} className="inline-block"><span className="inline-block bg-blue-600 text-white px-2 rounded-md">FG</span> FireGallery</Link>
        </h1>

        <>
          {user ? 
            <div className="flex gap-3 items-center">
              <img src={user.photoURL} className="rounded-full size-8 border border-blue-600 object-cover" alt={user.displayName} title={user.displayName} />
              <button onClick={handleSignOut} className="inline-block px-3 py-1.5 rounded-md bg-red-700 text-white text-sm hover:bg-red-800 transition-colors"> Logout </button>
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