module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      extend: {
        colors: {
          primary: "#060D17",
          secondary: "#10161D",
        },
      },
    },
    variants: {
      extend: {},
    },
    corePlugins: {
      container: false,
      order: false,
    },
    plugins: [
      require("tailwind-bootstrap-grid")({
        containerMaxWidths: {
          sm: "540px",
          md: "720px",
          lg: "960px",
          xl: "1140px",
        },
        gridGutters: {
          0: 0,
          1: "0.25rem",
          2: "0.5rem",
          3: "0.75rem",
        },
      }),
    ],
  };
  