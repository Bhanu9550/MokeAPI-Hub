import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../context/userContext";
import Loading from "../components/Loading";

const PublicRoutes = ()=> {
  const { user, loading } = useContext(UserContext);
  console.log(user)
  if (loading) return <Loading />;
  return user ? <Navigate to="/home" replace /> : <Outlet />;
}

export default PublicRoutes;
