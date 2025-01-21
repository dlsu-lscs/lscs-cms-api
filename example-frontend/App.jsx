import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";

// NOTE: for prod, change localhost to https://cms.app.dlsu-lscs.org (or create env var for dev and prod)
function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:3000/auth/user", { withCredentials: true })
            .then((response) => {
                setUser(response.data);
            })
            .catch(() => {
                setUser(null);
            });
    }, []);

    const handleLogout = () => {
        axios.get("http://localhost:3000/auth/logout", { withCredentials: true }).then(() => {
            setUser(null);
        });
    };

    return (
        <Router>
            <nav>
                <Link to="/">Home</Link>
                {user ? (
                    <>
                        <button onClick={handleLogout}>Logout</button>
                        <p>Welcome, {user.displayName}</p>
                    </>
                ) : (
                    <a href="http://localhost:3000/auth/login">Login with Google</a>
                )}
            </nav>
            <Routes>
                <Route path="/" element={<Home user={user} />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

function Home({ user }) {
    return <div>{user ? `Welcome, ${user.displayName}` : "Please log in."}</div>;
}

function Login() {
    return <div>Redirecting to Google login...</div>;
}

export default App;
