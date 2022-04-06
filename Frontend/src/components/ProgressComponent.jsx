import { Component } from "react";
import moment from "moment";
import { ErrorMessage, Field, Form, Formik } from "formik";
import AuthenticationService from "./AuthenticationService";
import ProgressDataService from "../api/GymProgress/ProgressDataService";

class ProgressComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            day: this.props.params.day,
            description: "",
            date: moment(new Date()).format("YYYY-MM-DD"),
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {
        if (this.state.day < 1) {
            return;
        }

        let username = AuthenticationService.getLoggedInUsername();

        ProgressDataService.retrieveProgress(username, this.state.day).then((response) =>
            this.setState({
                description: response.data.description,
                date: moment(response.data.date).format("YYYY-MM-DD"),
            })
        );
    }

    validate(values) {
        let errors = {};
        if (!values.description) {
            errors.description = "Enter a description.";
        } else if (values.description.length < 5) {
            errors.description = "Enter atleast 5 characters in description.";
        }

        if (!moment(values.date).isValid()) {
            errors.date = "Enter a valid date.";
        }

        return errors;
    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUsername();

        let progress = {
            day: this.state.day,
            description: values.description,
            date: values.date,
        };

        if (this.state.day === -1) {
            ProgressDataService.createProgress(username, progress).then(() => this.props.navigate("/progresses"));
        } else {
            ProgressDataService.updateProgress(username, this.state.day, progress).then(() =>
                this.props.navigate("/progresses")
            );
        }
    }

    render() {
        let { description, date } = this.state;

        return (
            <div>
                {this.props.params.day > 0 && <h1>Updating the progress for day {this.props.params.day}</h1>}
                {this.props.params.day < 1 && <h1>Add a new progress</h1>}
                <div className="container">
                    <Formik
                        initialValues={{ description, date }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {(props) => (
                            <Form>
                                <ErrorMessage name="description" component="div" className="alert alert-warning" />
                                <ErrorMessage name="date" component="div" className="alert alert-warning" />
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field className="form-control" type="text" name="description" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Date</label>
                                    <Field className="form-control" type="date" name="date" />
                                </fieldset>
                                <button className="btn btn-success" type="submit">
                                    Save
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        );
    }
}

export default ProgressComponent;
