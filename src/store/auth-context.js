import React, {useState} from 'react';

const AuthContext = React.createContext({
    token: '',
    isloggedIn: false,
    login: (token) => {},
    logout: () => {},
});

const claculateExpirationTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjExpirationTime - currentTime;

    return remainingDuration;
};

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;  //check if token is a string and is not empty

    const loginHandler = (token, expirationTime) => {
        setToken(token);
        localStorage.setItem('token', token);

        const remainingTime = claculateExpirationTime(expirationTime);
        console.log(remainingTime);

        setTimeout(logoutHandler, remainingTime);
    }

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    }

    const contextValue = {
        token: token,
        isloggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
};

export default AuthContext;

