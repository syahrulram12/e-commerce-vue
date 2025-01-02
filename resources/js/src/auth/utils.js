export const authUser = "authUser";
export const authAdmin = "authAdmin";

// Store auth user in localStorage
export const storeAuthUser = (user) => {
    localStorage.setItem("authUser", JSON.stringify(user));
};

// Get auth user from localStorage
export const getAuthUser = () => {
    const user = localStorage.getItem("authUser");
    return user ? JSON.parse(user) : null;
};

// Remove auth user from localStorage if null
export const checkAndRemoveAuthUser = () => {
    const user = getAuthUser();
    if (user === null) {
        localStorage.removeItem("authUser");
    }
};

export const removeUserData = () => {
    localStorage.removeItem("authUser");
};

// Store auth user in localStorage
export const storeAuthAdmin = (user) => {
    localStorage.setItem("authAdmin", JSON.stringify(user));
};

// Get auth user from localStorage
export const getAuthAdmin = () => {
    const user = localStorage.getItem("authAdmin");
    return user ? JSON.parse(user) : null;
};

// Remove auth user from localStorage if null
export const checkAndRemoveAuthAdmin = () => {
    const user = getAuthAdmin();
    if (user === null) {
        localStorage.removeItem("authAdmin");
    }
};
