export const appConfig = {
  name: import.meta.env.VITE_APP_NAME || "MegaMart",
  apiUrl: import.meta.env.VITE_API_URL || "/api",
  appUrl: import.meta.env.VITE_APP_URL || "http://localhost:5173",
};

export default appConfig;
