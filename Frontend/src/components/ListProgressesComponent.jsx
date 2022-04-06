import { Component } from "react";
import ProgressDataService from "../api/GymProgress/ProgressDataService";
import AuthenticationService from "./AuthenticationService";
import moment from "moment";

class ListProgressesComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            progresses: [],
            message: null,
        };

        this.refreshProgresses = this.refreshProgresses.bind(this);
        this.updateProgressClicked = this.updateProgressClicked.bind(this);
        this.addProgressClicked = this.addProgressClicked.bind(this);
    }

    componentDidMount() {
        this.refreshProgresses();
    }

    refreshProgresses() {
        let username = AuthenticationService.getLoggedInUsername();
        ProgressDataService.retrieveAllProgresses(username).then((response) => {
            this.setState({ progresses: response.data });
        });
    }

    updateProgressClicked(day) {
        this.props.navigate(`/progresses/${day}`);
    }

    addProgressClicked() {
        this.props.navigate(`/progresses/-1`);
    }

    render() {
        return (
            <div>
                <h1>Progress</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.progresses.map((progress) => (
                                <tr key={progress.day}>
                                    <td>{progress.day}</td>
                                    <td width="500">{progress.description}</td>
                                    <td>{moment(progress.date).format("DD-MM-YYYY")}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => this.updateProgressClicked(progress.day)}
                                        >
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="container">
                        <button className="btn btn-success" onClick={this.addProgressClicked}>
                            Add a progress
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListProgressesComponent;
