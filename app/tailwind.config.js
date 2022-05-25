module.exports = {
  content: ["./src/**/*.{html,js,jsx}", './node_modules/flowbite-react/**/*.js'],
  theme: {
    colors: {
    },
    extend: {
      spacing: {
        '4': '4px',
        '8': '8px',
        '16': '16px',
        '32': '32px',
      },
    },
    screens: {
      'xss': '200px'
    }
  },
  plugins: [
      require('flowbite/plugin')
  ],
}
