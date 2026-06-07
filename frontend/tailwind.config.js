export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sindhi: ['"MB Sarem Iqra"', '"Noto Nastaliq Urdu"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        sandstone: '#d9b98f',
        indigoAjrak: '#1f3d68',
        lake: '#1d9aa2',
        coralThread: '#c95b45',
        ink: '#18222a',
      },
      boxShadow: {
        heritage: '0 18px 50px rgba(24, 34, 42, 0.14)',
      },
    },
  },
  plugins: [],
};
