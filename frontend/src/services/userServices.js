const serverUrl = import.meta.env.VITE_API_URL;
const userApi = serverUrl + "/users";

/**
 * get logged in user if there is one
 * @returns user object or error
 */
export const getCurrentUser = async () => {
    const url = userApi + "/session";

    try {
        const response = await fetch(url);
        const user = await response.json();
        if (!user || !user.username) {
            return null;
        }
        return user;
    } catch(err) {
        return null;
    }
}

export const login = async (params) => {
    const url = userApi + "/login";
    
    const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(params)
    })

    return res.json();
}
