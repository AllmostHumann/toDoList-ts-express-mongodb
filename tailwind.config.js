/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        alto: '#D9D9D9',
        teal: '#008080',
        silverChalice: '#B1AFAF',
        silver: "#CCCCCC",
        japaneseLaurel: "#008000",
        limeade: "#3AB701",
        sunsetOrange: "#FF4747"
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif']
      },
      gridTemplateColumns: {
        auto: "auto, auto",
        1: "1fr",
        2: "1fr, auto",
        3: "25px 1fr 25px"
      },
    },
  },
  plugins: [],
};
