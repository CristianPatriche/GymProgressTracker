import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import withNavigation from "./WithNavigation";
import withParams from "./WithParams";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import LoginComponent from "./LoginComponent";
import WelcomeComponent from "./WelcomeComponent";
import ErrorComponent from "./ErrorComponent";
import ListProgressesComponent from "./ListProgressesComponent";
import LogoutComponent from "./LogoutComponent";
import AuthenticatedRoute from "./AuthenticatedRoute";
import ProgressComponent from "./ProgressComponent";

class GymProgressApp extends Component {
    render() {
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
        const ListProgressesComponentWithNavigation = withNavigation(ListProgressesComponent);
        const ProgressComponentWithNavigation = withNavigation(ProgressComponent);
        const WelcomeComponentWithParams = withParams(WelcomeComponent);
        const ProgressComponentWithParams = withParams(ProgressComponentWithNavigation);

        return (
            <div className="GymProgressApp">
                <BrowserRouter>
                    <HeaderComponentWithNavigation />
                    <Routes>
                        <Route path="/" element={<LoginComponentWithNavigation />} />
                        <Route path="/login" element={<LoginComponentWithNavigation />} />
                        <Route
                            path="/welcome/:name"
                            element={
                                <AuthenticatedRoute>
                                    <WelcomeComponentWithParams />
                                </AuthenticatedRoute>
                            }
                        />
                        <Route
                            path="/progresses/:day"
                            element={
                                <AuthenticatedRoute>
                                    <ProgressComponentWithParams />
                                </AuthenticatedRoute>
                            }
                        />
                        <Route
                            path="/progresses"
                            element={
                                <AuthenticatedRoute>
                                    <ListProgressesComponentWithNavigation />
                                </AuthenticatedRoute>
                            }
                        />
                        <Route path="/logout" element={<LogoutComponent />} />
                        <Route path="*" element={<ErrorComponent />} />
                    </Routes>
                    <FooterComponent />
                </BrowserRouter>
            </div>
        );
    }
}

export default GymProgressApp;
