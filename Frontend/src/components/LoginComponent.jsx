import { Component } from "react";
import AuthenticationService from "./AuthenticationService";

class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "Admin",
            password: "",
            loginFailed: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    loginClicked() {
        AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
            .then(() => {
                AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
                this.props.navigate(`/welcome/${this.state.username}`);
            })
            .catch(() => {
                this.setState({ loginFailed: true });
            });
    }

    render() {
        return (
            <div>
                <main className="form-signin">
                    <h1 className="h3 mb-3 fw-normal">Please log in</h1>
                    <div className="container">
                        {this.state.loginFailed && <div className="alert alert-warning">Invalid Credentials</div>}

                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                id="username"
                                placeholder="Admin"
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                            <label htmlFor="floatingInput">Username</label>
                        </div>

                        <div className="form-floating">
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                id="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                            <label htmlFor="password">Password</label>
                        </div>

                        <button className="w-100 btn btn-lg btn-primary" onClick={this.loginClicked}>
                            Login
                        </button>
                    </div>
                </main>
            </div>
        );
    }
}

export default LoginComponent;
