/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./index.js"],
  theme: {
    extend: {
      colors: {
        // Dark shades
        "dark-grey": "#24232C",
        //prettier-ignore
        "grey": "#817D92",
        "almost-white": "#E6E5EA",
        "very-dark-grey": "#18171F",
        // Accent colors
        //prettier-ignore
        "green": "#A4FFAF",
        //prettier-ignore
        "red": "#F64A4A",
        //prettier-ignore
        "orange": "#FB7C58",
        //prettier-ignore
        "yellow": "#F8CD65",
      },
      fontFamily: {
        //prettier-ignore
        "mono": ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "heading-l": [
          "32px",
          {
            lineHeight: "45px",
            fontWeight: "bold",
          },
        ],
        "heading-m": [
          "24px",
          {
            lineHeight: "31px",
            fontWeight: "bold",
          },
        ],
        body: [
          "18px",
          {
            lineHeight: "25px",
            fontWeight: "bold",
          },
        ],
      },
    },
  },
  plugins: [],
};
