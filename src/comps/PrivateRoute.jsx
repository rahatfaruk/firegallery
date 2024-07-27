import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

function PrivateRoute({children}) {
  const {user} = useContext(AuthContext)

  if (user) {
    return <>{children}</>
  }
  return <Navigate to={'/login'} />
}

export default PrivateRoute;