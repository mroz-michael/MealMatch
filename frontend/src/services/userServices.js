const URL_PREFIX = "/api/users";

/**
 * get logged in user if there is one
 * @returns user object or error
 */
export const getCurrentUser = async () => {
    const url =  URL_PREFIX + "/session";

    try {
        
        const response = await fetch(url, {
            credentials: "include"
        });

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
    const url = URL_PREFIX + "/login";
    
    const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(params)
    })

    switch (res.status) {
        case 200:
            return res.json();
        case 400:
            throw new Error("Invalid Username or Password");
            break;
        default:
            throw new Error("Unknown error");
    }

    
}

export const logout = async (user) => {
    const url = URL_PREFIX + "/logout";

    const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    })

    return res.json();
}
