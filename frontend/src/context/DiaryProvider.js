import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DiaryContext = createContext();

const DiaryProvider = ({ children }) => {
    const [user, setUser] = useState(); // Initialize user state as undefined
   
    const navigate = useNavigate();

    useEffect(() => {
       const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        if (!userInfo) {
            // navigate("/"); // Navigate to the login page if user info is not available
            setUser(undefined); // Set user state to undefined
            return;
        }

        setUser(userInfo); // Set user state with the retrieved user info
    }, [navigate]);

    return (
        <DiaryContext.Provider value={{ user, setUser }}>
            {children}
        </DiaryContext.Provider>
    );
};

export const DiaryState = () => {
    return useContext(DiaryContext);
};

export default DiaryProvider;