const environment = {
  production: false,
    apiUrl: "http://localhost:4000/api/v1/", // Update this to your API URL
    authToken: "", // This can be set dynamically after user login
};

export default environment;
export type Environment = typeof environment;