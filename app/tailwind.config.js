module.exports = {
  content: ["./src/**/*.{html,js,jsx}", './node_modules/flowbite-react/**/*.js'],
  theme: {
    extend: {
    },
    screens: {
      'xss': '200px'
    }
  },
  plugins: [
      require('flowbite/plugin')
  ],
}
