// Tailwind 配置
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#4285F4', // Google Blue
        secondary: '#DB4437', // Google Red
        accent: '#F4B400', // Google Yellow
        success: '#0F9D58', // Google Green
        neutral: {
          50: '#F8F9FA',
          100: '#F1F3F4',
          200: '#E8EAED',
          300: '#DADCE0',
          400: '#9AA0A6',
          500: '#70757A',
          600: '#5F6368',
          700: '#3C4043',
          800: '#202124',
          900: '#171717',
        }
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15)',
        'hover': '0 1px 3px 0 rgba(60, 64, 67, 0.3), 0 4px 8px 3px rgba(60, 64, 67, 0.15)',
      }
    },
  }
}