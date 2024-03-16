/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                "login-bg":
                    "linear-gradient(152deg, rgba(2,0,36,1) 0%, rgba(220,114,233,1) 35%, rgba(0,146,255,1) 100%)",
            },
        },
    },
    plugins: [],
};
