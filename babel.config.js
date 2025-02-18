module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@screen': './src/screen',
          '@assets': './src/assets',
          '@services': './src/services',
          '@navigation': './src/navigation',
        },
      },
    ],
  ],
};
