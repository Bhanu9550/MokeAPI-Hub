import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Home from "./pages/home/Home";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import PublicRoutes from "./routes/publicRoutes.jsx";
import ProtectedRoutes from "./routes/protectedRoutes.jsx";
import "./App.css";

export default function App() {
  return (
  <BrowserRouter>
      <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<Home />} />
      </Route>
      </Routes>
  </BrowserRouter>
)}
