export const setToken = (token) => sessionStorage.setItem("auth_token", token);
export const getToken = () => sessionStorage.getItem("auth_token");
