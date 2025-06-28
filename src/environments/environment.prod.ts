const environment = {
  production: true,
    apiUrl: "https://api.example.com", // Update this to your production API URL
    authToken: "", // This can be set dynamically after user login
};
export default environment;
export type Environment = typeof environment;