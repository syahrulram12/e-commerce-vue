export const authUser = "authUser";
export const authAdmin = "authAdmin";

// Store auth user in localStorage
export const storeAuthUser = (userType, user) => {
    localStorage.setItem(userType, JSON.stringify(user));
};

// Get auth user from localStorage
export const getAuthUser = (userType) => {
    const user = localStorage.getItem(userType);
    return user !== null || typeof user !== "undefined"
        ? JSON.parse(user)
        : null;
};

// Remove auth user from localStorage if null
export const checkAndRemoveAuthUser = (userType) => {
    const user = getAuthUser(userType);
    if (user === null) {
        localStorage.removeItem(userType);
    }
};

export const removeUserData = (userType) => {
    localStorage.removeItem(userType);
};

export const storeToken = (token) => {
    localStorage.setItem("token", token);
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const removeToken = () => {
    localStorage.removeItem("token");
};
