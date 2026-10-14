import { NavLink } from 'react-router-dom';

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    Aurora CS Course Scheduler
                </NavLink>

                <div className="navbar-nav ms-auto">
                    <NavLink
                        className={({ isActive }) =>
                            `nav-link ${isActive ? 'active' : ''}`
                        }
                        to="/"
                        end
                    >
                        Home
                    </NavLink>

                    <NavLink
                        className={({ isActive }) =>
                            `nav-link ${isActive ? 'active' : ''}`
                        }
                        to="/about"
                    >
                        About
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;