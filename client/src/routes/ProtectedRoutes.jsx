import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../context/userContext";
import Loading from "../components/Loading";

const ProtectedRoutes = ()=> {
  const { user, loading } = useContext(UserContext);
  if (loading) return <Loading />;
  return user ? <Outlet /> : <Navigate to="/signin" replace />;
}

export default ProtectedRoutes;
