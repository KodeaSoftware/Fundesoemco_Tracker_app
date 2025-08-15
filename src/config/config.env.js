const ENV = import.meta.env.VITE_APP_ENV;

export const API_URL =
    ENV === "prod"
        ? import.meta.env.VITE_BACKEND_PROD
        : ENV === "dev"
            ? import.meta.env.VITE_BACKEND_DEV
            : console.log("There is no defined production or development environment, or variable ENV.")