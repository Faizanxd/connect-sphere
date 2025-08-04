// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"], // or wherever your files are
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"], // You can change to 'Poppins', 'Rubik' etc.
      },
      colors: {
        primary: "#0073b1", // LinkedIn blue or choose your own
        secondary: "#f3f4f6", // Light background
        dark: "#1a1a1a",
        light: "#ffffff",
        muted: "#6b7280",
      },
      borderRadius: {
        xl: "1rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
