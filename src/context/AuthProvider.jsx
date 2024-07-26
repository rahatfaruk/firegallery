import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { fbAuth } from "../../firebase.config";
import Loading from "../comps/Loading";

export const AuthContext = createContext(null)

function AuthProvider({children}) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // # check user onLoad page. fire callback each time user state changes
  useEffect(() => {
    const unsub = onAuthStateChanged(fbAuth, currUser => {
      setUser(currUser);
      console.log('currUser', currUser);
      setLoading(false)
    })

    return unsub;
  }, [])

  if (loading) {
    return <Loading />
  }

  return <AuthContext.Provider value={{user, loading}}>
    {children}
  </AuthContext.Provider> 
}

export default AuthProvider;