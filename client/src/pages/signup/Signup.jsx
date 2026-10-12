import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../configure/axiosInstance";
import "./Signup.css";

export default function Signup() {
  const [details, setDetails] = useState({ username: "", password: "" });
   const [errors, setErrors] = useState({
    username: "",
    password: "",
    general: ""
  });
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

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
    const password = details.password;

    if (username.length < 5) {
      return setErrors((prev) => ({
        ...prev,
        username: "Username must contain at least 5 characters."
      }));
    }
    if (password.length < 6) {
      return setErrors((prev) => ({
        ...prev,
        password: "Password must contain at least 6 characters."
      }));
    }
    setBusy(true);

    try {
      await api.post("/signup", { username, password });
      navigate("/signin", {
        state: { message: "Account created successfully. Please sign in." }
      });
    } catch (err) {
      const response = err.response;
      const message =
        response?.data?.message ||
        "Unable to create your account. Please try again.";
      const field = response?.data?.field;

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
  <>
    <main className="auth-page signup-page">
      <Link className="brand auth-brand" to="/">
        <span className="brand-mark">{`{ }`}</span> MockAPI Hub
      </Link>
      
      <section className="auth-card">
        <div className="auth-symbol">＋</div>
        <span className="eyebrow">GET STARTED</span>
        <h1>Create your account</h1>
        <p className="auth-subtitle">A simpler way to build and test with APIs.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" value={details.username} onChange={update} placeholder="Choose a username" autoComplete="username" minLength="5" required/>
          {errors.username && (
            <p className="auth-passwordError">{errors.username}</p>
          )}

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={details.password} onChange={update} placeholder="Create a password" autoComplete="new-password" minLength="6" required/>
          {errors.password && (
            <p className="auth-passwordError">{errors.password}</p>
          )}

          {errors.general && (
            <p className="auth-passwordError">{errors.general}</p>
          )}

          <button className="btn auth-submit" disabled={busy}>
            {busy ? "Creating account..." : "Create account →"}
          </button>
        </form>

        {errors.username.includes("already exists") && (
          <p className="auth-switch">
            Already registered? <Link to="/signin">Sign in</Link>
          </p>
        )}

        {!errors.username.includes("already exists") && (
          <p className="auth-switch">
            Already have an account? <Link to="/signin">Sign in</Link>
          </p>
        )}
      </section>

      <p className="auth-bottom">
        Free to start. Built for your ideas.
      </p>    </main>;
  </>
)}
