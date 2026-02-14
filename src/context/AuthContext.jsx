import React, { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Hàm load user khi app khởi chạy
    const loadUser = async () => {
        try {
            const response = await authService.getMe();
            setUser(response.data);
            setIsAuthenticated(true);
        } catch (error) {
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const login = async (email, password) => {
        const response = await authService.login(email, password);
        if (response.status === 200) {
            // Sau khi login thành công, cookie đã được set. 
            // Gọi lại loadUser hoặc set user từ response nếu response trả về user info
            // Ở đây backend trả về LoginResponse, giả sử chưa có full info user, ta gọi getMe
            await loadUser();
            return true;
        }
        return false;
    };

    const logout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            setUser(null);
            setIsAuthenticated(false);
            // Có thể reload trang để xóa sạch state
            window.location.href = "/signin";
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);