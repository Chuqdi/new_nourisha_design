const useAuthToken = () => {
  const AUTH_TOKEN = "AUTH_TOKEN";
  const getToken = () => {
    return typeof window !== "undefined" && window.localStorage?.getItem(AUTH_TOKEN);
  };

  const setToken = (value: string) => {
    typeof window !== "undefined" && window.localStorage?.setItem(AUTH_TOKEN, value);
  };

  const deleteToken =()=>{
    typeof window !== "undefined" && localStorage?.removeItem(AUTH_TOKEN);
  }
  return {
    getToken,
    setToken,
    deleteToken,
  };
};


export default useAuthToken;