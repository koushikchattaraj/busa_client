const isAuthenticated = () => {
  // Replace this with actual authentication logic
  return localStorage.getItem("authToken") === process.env.REACT_APP_AUTH_TOKEN;
};

export default isAuthenticated;
