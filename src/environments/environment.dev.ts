const environment = {
  production: false,
    apiUrl: "http://localhost:3000/api", // Update this to your API URL
    authToken: "", // This can be set dynamically after user login
};

export default environment;
export type Environment = typeof environment;