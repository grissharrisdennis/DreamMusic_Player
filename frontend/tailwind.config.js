/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, #190A05, #870000)',
        'custom-gradient1': "linear-gradient(180deg, #4C0000 0%, #0A0A0A 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 73.01%, rgba(15, 15, 15, 0.6) 73.01%)",
        'custom-gradient2':"linear-gradient(180deg, #4C0000 -30%, #0A0A0A 100%), linear-gradient(90deg, rgba(0, 0, 0, 0) 89.01%, rgba(15, 15, 15, 0.6) 90.01%)",
      },
      fontFamily: {
        'poppins': ['Poppins'],
     },
     boxShadow: {
      'custom-shadow': '0 0 10px 0 rgba(0, 0, 0, 0.25)', // 0.25 corresponds to 40% opacity
    },
    },
  },
  plugins: [],
}

