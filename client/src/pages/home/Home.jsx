import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext";
import api from "../../configure/axiosInstance";
import "./Home.css";

const sampleData = '[\n  {\n    "title": "Wireless Headphones",\n    "price": 49.99\n  },\n  {\n    "title": "Running Shoes",\n    "price": 79.99\n  }\n]';


const Home = () => {

  const { user, setUser } = useContext(UserContext);
  console.log(user)
  const [jsonName, setJsonName] = useState("");
  const [json, setJson] = useState(sampleData);
  const [endpoint, setEndpoint] = useState(null)
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const navigate = useNavigate();

  async function createEndpoint(e) {
    e.preventDefault();
    setMessage("");
    let data;

    try {
      data = JSON.parse(json);
    } catch {
      setMessage("Please enter valid JSON first.");
      return;
    }

    setBusy(true);
    try {
      const response = await api.post("/api/sendjson", { jsonName: jsonName.trim(), data });
      setUser(response.data.user)
      setEndpoint(response.data.endpoint)
      setMessage("Collection created successfully.");
    } catch (err) {
      setMessage(err.response?.data?.message);
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    try {
      await api.post("/logout");
      setUser(null);
      navigate("/signin");
    } catch (err) {
      console.log(err)
    }
  }

  const formatExpiryDate = (dbDate) => {
  const date = new Date(dbDate);
  const options = {
    day: 'numeric',   // "12"
    month: 'short',   // "Oct"
    hour: '2-digit',   // "11"
    minute: '2-digit', // "43"
    hour12: true       // AM/PM format
  };
  return date.toLocaleString('en-IN', options); 
};


  return (
    <>
      <div className="dashboard">
        <header className="dash-nav">
          <Link className="brand" to="/">
            <span className="brand-mark">{`{ }`}</span> MockAPI Hub
          </Link>
          <div className="dash-user">
            <span className="avatar">{(user?.user?.username || user?.username || "D").slice(0, 1).toUpperCase()}</span>
            <span>{user?.user?.username || user?.username || "Developer"}</span>
            <button onClick={logout}>Log out</button>
          </div>
        </header>

        <main className="dash-main">
          <div className="dash-heading">
            <div>
              <span className="eyebrow">YOUR WORKSPACE</span>
              <h1>Build your next API.</h1>
              <p>Create mock endpoints for your frontend projects in seconds.</p>
            </div>
            <span className="workspace-tag">✦ Developer workspace</span>
          </div>
          <div className="dash-grid">
            <form className="create-panel" onSubmit={createEndpoint}>
              <div className="panel-heading">
                <div>
                  <span className="panel-icon">＋</span>
                  <div>
                    <h2>Create a collection</h2>
                    <p>Paste your sample JSON to get started.</p>
                  </div>
                </div>
                <span className="json-pill">JSON</span>
              </div>
              <label htmlFor="collection-name">Collection name</label>
              <input id="collection-name" value={jsonName} onChange={e => setJsonName(e.target.value)} placeholder="e.g. products" required />

              <div className="editor-label">
                <label htmlFor="json-data">Your JSON data</label>
                <span>Array</span>
              </div>
              <textarea id="json-data" value={json} onChange={e => setJson(e.target.value)} spellCheck="false" required />
              <button className="btn create-btn" type="submit" disabled={busy}>{busy ? "Creating..." : "Generate API endpoint →"}</button>

              {message && <p className={message.includes("successfully") ? "form-message success" : "form-message"}>{message}</p>}
              {endpoint && <div className="endpoint-result">
                <span>YOUR ENDPOINT</span>
                <code>{endpoint}</code>
                <button type="button" onClick={() => navigator.clipboard?.writeText(endpoint)}>Copy URL</button>
              </div>}
            </form>

            <aside className="side-panels">
              <section className="tip-panel">
                <span className="tip-icon">✦</span>
                <h3>Quick tip</h3>
                <p>Use an array of objects for product lists, user directories, or any collection you want to prototype.</p>
                {/* <pre>{`fetch("YOUR_ENDPOINT")
                  .then(res => res.json())
                  .then(data => console.log(data));`}
              </pre> */}
              </section>

              <section className="empty-panel">
                {
                  user?.jsonDataDetails && user.jsonDataDetails.length > 0 ? (
                    <div className="collections-list">
                      {user.jsonDataDetails.map((item) => (
                        <a key={item._id}
                          href={item.endpoint}
                          target="_blank"
                          rel="noreferrer"
                          className="collection-item-btn">
                          <span className="api-name">{item.name}</span>
                          <span className="api-expiry">Expires at : {formatExpiryDate(item.jsonExpiryDate)}</span>
                        </a>
                      ))}
                    </div>
                  ) :
                    <>
                      <div className="empty-icon">⌁</div>
                      <h3>Your collections</h3>
                      <p>Your API collections will appear here as you create them.</p>
                      <span className="collection-count">No collections yet</span>
                    </>
                }
              </section>

            </aside>
          </div>
        </main>

        <footer className="dash-footer">MockAPI Hub
          <span>·</span> Make development simpler.
        </footer>
      </div>;
    </>
  )
}

export default Home;
