
export const isAuthenticate = () => {
    const token = sessionStorage.get('loginToken');
    if(!token) return false;
    return true;

}

