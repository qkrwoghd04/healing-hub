/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        blue: '#4C80F1',
        navy: '#20284F',
      },
      fontFamily: {
        'Pretendard-Light': ['Pretendard-Light', 'sans-serif'],
        'Pretendard-Medium': ['Pretendard-Medium', 'sans-serif'],
        'SpoqaBold': ['SpoqaHanSansNeo-Bold', 'sans-serif'],
        'SpoqaLight': ['SpoqaHanSansNeo-Light', 'sans-serif'],
        'SpoqaMedium': ['SpoqaHanSansNeo-Medium', 'sans-serif'],
        'SpoqaRegular': ['SpoqaHanSansNeo-Regular', 'sans-serif'],
        'SpoqaThin': ['SpoqaHanSansNeo-Thin', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
