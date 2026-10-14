
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
                {/*<h1 className="text-center mb-4">*/}
                {/*    Aurora CS Course Scheduler*/}
                {/*</h1>*/}

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
