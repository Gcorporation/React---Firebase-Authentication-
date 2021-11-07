import React, {useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
    token: '',
    isloggedIn: false,
    login: (token) => {},
    logout: () => {},
});

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationTime');

    const remainingTime = claculateExpirationTime(storedExpirationDate);

    if(remainingTime <= 60000) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');

        return null;
    }

    return { token: storedToken, duration: remainingTime };
}

const claculateExpirationTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjExpirationTime - currentTime;

    return remainingDuration;
};

export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();
    let initialToken;
    
    if(tokenData) {
        initialToken = tokenData.token;
    }

    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;  //check if token is a string and is not empty

    const loginHandler = (token, expirationTime) => {
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime);

        const remainingTime = claculateExpirationTime(expirationTime);
        console.log(remainingTime);

        logoutTimer = setTimeout(logoutHandler, remainingTime);
    }

    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');

        if(logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    useEffect(() => {
        if (tokenData) {
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler]);

    const contextValue = {
        token: token,
        isloggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
};

export default AuthContext;

