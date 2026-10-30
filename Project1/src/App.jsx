
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import NavBar from './components/NavBar.jsx';

function App() {
    return (
        <>
            <NavBar />

            <main className="container my-4">
                <h2 className="mb-3">Computer Science Course Catalog</h2>

                <Routes>
                    <Route path="/" element={<HomePage />} />

                    <Route path="/about" element={<AboutPage />} />

                    <Route
                        path="*"
                        element={
                            <div className="text-center mt-5">
                                <h2>404 — Page Not Found</h2>
                                <Link to="/">Back to Home</Link>
                            </div>
                        }
                    />
                </Routes>
            </main>
        </>
    );
}

export default App;
