module.exports = {
  content: ["./src/**/*.{html,js,jsx}", './node_modules/flowbite-react/**/*.js'],
  theme: {
    extend: {
      maxWidth: {
        'date': '200px',
        'button': '120px',
        '32': '32px'
      },
      height: {
        '32': '32px',
        '48': '48px'
      },
      width: {
        '32': '32px',
        '48': '48px'
      },
      minHeight: {
        'card': '100%'
      },
      spacing: {
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '32': '32px',
      },
      screens: {
        'xss': '200px'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
