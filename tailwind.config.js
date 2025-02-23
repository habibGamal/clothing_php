const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Tajawal", "system-ui", "sans-serif"],
                tajawal: ["Tajawal", "sans-serif"],
            },
            colors: {
                primary: {
                    DEFAULT: "#000000",
                    hover: "#1a1a1a",
                },
                secondary: {
                    DEFAULT: "#ffffff",
                    hover: "#f5f5f5",
                },
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
