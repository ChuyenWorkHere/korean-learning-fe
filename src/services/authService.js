import axiosClient from "../api/axiosClient";

const authService = {
    login: (email, password) => {
        return axiosClient.post("/auth/login", { username: email, password });
    },

    signup: (userData) => {
        // userData mapping với SignUpRequest của backend
        return axiosClient.post("/auth/signup", userData);
    },

    getMe: () => {
        return axiosClient.get("/auth/me");
    },

    logout: () => {
        return axiosClient.post("/auth/logout");
    },
};

export default authService;