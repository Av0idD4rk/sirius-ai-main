import wretch from "wretch";

import {Preferences} from '@capacitor/preferences';

// Base API setup for making HTTP requests
const api = wretch(process.env.BACKEND_IP_ADDRESS + "/api/v1");
/**
 * Stores a token in cookies.
 * @param {string} token - The token to be stored.
 * @param {"access" | "refresh"} type - The type of the token (access or refresh).
 */
const storeToken = async (token: string, type: "access" | "refresh") => {
    await Preferences.set({
        key: type + "Token",
        value: token,
    })
};
/**
 * Retrieves a token from cookies.
 * @param {"access" | "refresh"} type - The type of the token to retrieve (access or refresh).
 * @returns {string | null} The token, if found.
 */
const getToken = async (type: string): Promise<string | null> => {
    const ret = await Preferences.get({
        key: type + "Token",
    })
    return ret.value
};

/**
 * Removes both access and refresh tokens from cookies.
 */
const removeTokens = () => {
    Preferences.remove({
        key: "accessToken",
    })
    Preferences.remove({
        key: "refreshToken",
    })
};
const register = (email: string, username: string, password: string) => {
    return api.post({email, username, password}, "/auth/users/");
};

const login = (username: string, password: string) => {
    return api.post({username, password}, "/auth/jwt/create/");
};

const logout = async () => {
    const refreshToken = await getToken("refresh");
    return api.post({refresh: refreshToken}, "/auth/logout/");
};

const handleJWTRefresh = () => {
    const refreshToken = getToken("refresh");
    return api.post({refresh: refreshToken}, "/auth/jwt/refresh");
};

const resetPassword = (email: string) => {
    return api.post({email}, "/auth/users/reset_password/");
};

const resetPasswordConfirm = (
    new_password: string,
    re_new_password: string,
    token: string,
    uid: string
) => {
    return api.post(
        {uid, token, new_password, re_new_password},
        "/auth/users/reset_password_confirm/"
    );
};
const isAuthenticated = () => {

}

export const AuthActions = () => {
    return {
        login,
        resetPasswordConfirm,
        handleJWTRefresh,
        register,
        resetPassword,
        storeToken,
        getToken,
        logout,
        removeTokens,
        isAuthenticated,
    };
};