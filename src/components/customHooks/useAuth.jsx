
const useAuth = () => {

    const logout = () => {
        sessionStorage.removeItem('loginToken');
    }
    return { logout };
}

export default useAuth;