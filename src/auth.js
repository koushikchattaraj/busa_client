const isAuthenticated = () => {
  // Replace this with actual authentication logic
  return localStorage.getItem("authToken") !== null;
};

export default isAuthenticated;
