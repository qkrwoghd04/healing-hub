module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'Pretendard-Light': ['Pretendard-Light', 'sans-serif'],
        'Pretendard-Medium' : ['Pretendard-Medium', 'sans-serif'],
        'Typography-Times-Regular' : ['Typography-Times-Regular', 'sans-serif']
      },
    },
  },
  plugins: [],
}