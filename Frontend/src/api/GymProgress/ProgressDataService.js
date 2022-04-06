import axios from "axios";
import { API_URL } from "../../components/Utils";

class ProgressDataService {
    retrieveAllProgresses(username) {
        return axios.get(`${API_URL}/users/${username}/progresses`);
    }

    retrieveProgress(username, day) {
        return axios.get(`${API_URL}/users/${username}/progresses/${day}`);
    }

    updateProgress(username, day, progress) {
        return axios.put(`${API_URL}/users/${username}/progresses/${day}`, progress);
    }

    createProgress(username, progress) {
        return axios.post(`${API_URL}/users/${username}/progresses`, progress);
    }
}

export default new ProgressDataService();
