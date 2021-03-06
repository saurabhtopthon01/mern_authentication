import cookie from 'react-cookies'

// Set in Cookie
export const setCookie = (key, value) => {
    const expires = new Date()
   expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14)
    if (window !== 'undefiend') {
        cookie.save(key, value, {
            // 1 Day
            expires,
        }) 
    }
}
// remove from cookie
export const removeCookie = key => {
    const expires = new Date()
   expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14)
    if (window !== 'undefined') {
        cookie.remove(key, {
            expires,
        });
    }
};


export const getCookie = key => {
    if (window !== 'undefined') {
        return cookie.load(key);
    }
};

// Set in localstorage
export const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

// Remove from localstorage
export const removeLocalStorage = key => {
    if (window !== 'undefined') {
        localStorage.removeItem(key);
    }
};

// Auth enticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
    console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response);
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    next();
};

// Access user info from localstorage
export const isAuth = () => {
    if (window !== 'undefined') {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
};

export const signout = next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
};

export const updateUser = (response, next) => {
    console.log('UPDATE USER IN LOCALSTORAGE HELPERS', response);
    if (typeof window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('user'));
        auth = response.data;
        localStorage.setItem('user', JSON.stringify(auth));
    }
    next();
};