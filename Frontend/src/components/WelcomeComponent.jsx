import { Component } from "react";
import { Link } from "react-router-dom";

class WelcomeComponent extends Component {
    render() {
        return (
            <>
                <div className="container">
                    <h1>Welcome!</h1>
                    You can manage your progress
                    <Link to="/progresses"> here</Link>.
                </div>
            </>
        );
    }
}

export default WelcomeComponent;
