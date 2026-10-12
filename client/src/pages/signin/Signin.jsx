
import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import UserContext from "../../context/userContext";
import api from "../../configure/axiosInstance";
import "./Signin.css";

export default function Signin() {
  const [details, setDetails] = useState({
    username: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    general: ""
  });

  const [busy, setBusy] = useState(false);

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  function update(e) {
    const { name, value } = e.target;

    setDetails({ ...details, [name]: value });

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      general: ""
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setErrors({ username: "", password: "", general: "" });

    const username = details.username.trim();

    if (!username) {
      return setErrors((prev) => ({
        ...prev,
        username: "Please enter your username."
      }));
    }

    if (!details.password) {
      return setErrors((prev) => ({
        ...prev,
        password: "Please enter your password."
      }));
    }

    setBusy(true);

    try {
      const response = await api.post("/signin", {
        username,
        password: details.password
      });

      setUser(response.data.user);

      navigate("/home", { replace: true });
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Unable to connect to the server. Please try again.";

      const field = err.response?.data?.field;

      if (field === "username" || field === "password") {
        setErrors((prev) => ({
          ...prev,
          [field]: message
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          general: message
        }));
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-page">
      <Link className="brand auth-brand" to="/">
        <span className="brand-mark">{"{ }"}</span> MockAPI Hub
      </Link>

      <section className="auth-card">
        <div className="auth-symbol">↗</div>
        <span className="eyebrow">WELCOME BACK</span>
        <h1>Sign in to your hub</h1>
        <p className="auth-subtitle">
          Pick up where your next API begins.
        </p>

        {location.state?.message && (
          <p className="auth-success">
            {location.state.message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" value={details.username} onChange={update} placeholder="Enter your username" autoComplete="username" required />
          {errors.username && (
            <p className="auth-error">{errors.username}</p>
          )}

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={details.password} onChange={update} placeholder="Enter your password" autoComplete="current-password" required />
          {errors.password && (
            <p className="auth-error">{errors.password}</p>
          )}

          {errors.general && (
            <p className="auth-error">{errors.general}</p>
          )}
          <button className="btn auth-submit" disabled={busy}>
            {busy ? "Signing in..." : "Sign in →"}
          </button>
        </form>

        <p className="auth-switch">
          New to MockAPI Hub? <Link to="/signup">Create an account</Link>
        </p>
      </section>

      <p className="auth-bottom">
        Simple APIs. More time to build.
      </p>
    </main>
  );
}
