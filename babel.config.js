module.exports = {
  presets: [
    ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
    'nativewind/babel',
  ],
  plugins: [
    // Required for expo-router
    'expo-router/babel',
    'react-native-reanimated/plugin',
  ],
};
