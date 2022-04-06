import axios from "axios";
import { API_URL, USERNAME_SESSION_ATTRIBUTE_NAME } from "./Utils";

class AuthenticationService {
    createBasicAuthToken(username, password) {
        return "Basic " + window.btoa(username + ":" + password);
    }

    executeBasicAuthenticationService(username, password) {
        return axios.get(`${API_URL}/basicauth`, {
            headers: {
                authorization: this.createBasicAuthToken(username, password),
            },
        });
    }

    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem(USERNAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
    }

    logout() {
        sessionStorage.removeItem(USERNAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn() {
        let username = sessionStorage.getItem(USERNAME_SESSION_ATTRIBUTE_NAME);
        if (username === null) return false;
        return true;
    }

    getLoggedInUsername() {
        let username = sessionStorage.getItem(USERNAME_SESSION_ATTRIBUTE_NAME);
        if (username === null) return "";
        return username;
    }

    setupAxiosInterceptors(basicAuthHeader) {
        axios.interceptors.request.use((config) => {
            if (this.isUserLoggedIn()) {
                config.headers.authorization = basicAuthHeader;
            }
            return config;
        });
    }
}

export default new AuthenticationService();
