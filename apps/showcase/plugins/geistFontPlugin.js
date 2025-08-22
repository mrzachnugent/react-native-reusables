const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addUtilities }) {
  addUtilities({
    '.font-sans': {
      fontFamily: 'Geist',
    },
  });

  addUtilities({
    '.font-thin': { fontFamily: 'Geist-Thin' },
    '.font-extralight': { fontFamily: 'Geist-ExtraLight' },
    '.font-light': { fontFamily: 'Geist-Light' },
    '.font-normal': { fontFamily: 'Geist' },
    '.font-medium': { fontFamily: 'Geist-Medium' },
    '.font-semibold': { fontFamily: 'Geist-SemiBold' },
    '.font-bold': { fontFamily: 'Geist-Bold' },
    '.font-extrabold': { fontFamily: 'Geist-ExtraBold' },
    '.font-black': { fontFamily: 'Geist-Black' },
  });
});
