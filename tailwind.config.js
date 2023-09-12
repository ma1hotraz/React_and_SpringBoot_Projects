/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.jsx',
  ],
  // purge: [
  //   './src/**/*.html',
  //   './src/**/*.js',
  //   './src/**/*.jsx',
  // ],
  
  theme: {
    extend: {},
    fontFamily: {
      'Primary': ['Manrope', ' sans-serif']
    },
    colors: {
      'black-bg': '#000000',
      'navbar-bg': '#1b1b1b',
      'top-block-bg': 'bg-gradient-to-r from-slate-900 to-slate-700',
    },
    textColor: {
      'primary-font': '#FFFFFF',
      'secondary-font': '#828282'

    }

  },
  plugins: [],

}

