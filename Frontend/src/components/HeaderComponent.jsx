import { Component } from "react";
import { Link } from "react-router-dom";
import AuthenticationService from "./AuthenticationService";

class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div className="container-fluid">
                        <h1 className="navbar-brand">Gym Progress Tracker</h1>
                        <ul className="navbar-nav">
                            <li>
                                {isUserLoggedIn && (
                                    <Link className="nav-link" to="/welcome/Admin">
                                        Home
                                    </Link>
                                )}
                            </li>
                            <li>
                                {isUserLoggedIn && (
                                    <Link className="nav-link" to="/progresses">
                                        Progress
                                    </Link>
                                )}
                            </li>
                        </ul>
                        <ul className="navbar-nav navbar-collapse justify-content-end">
                            <li>
                                {!isUserLoggedIn && (
                                    <Link className="nav-link" to="/login">
                                        Login
                                    </Link>
                                )}
                            </li>
                            <li>
                                {isUserLoggedIn && (
                                    <Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>
                                        Logout
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

export default HeaderComponent;
