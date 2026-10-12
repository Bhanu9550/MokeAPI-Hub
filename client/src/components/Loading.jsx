import "./Loading.css";

const Loading = ()=> { 
    return (
    <div className="loading-screen">
        <span className="loading-mark">{`{ }`}</span>
        <p>Loading MockAPI Hub...</p>
    </div>
    )
}

export default Loading;
