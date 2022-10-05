// module.exports = {
//   transformer: {
//     babelTransformerPath: require.resolve(
//       "react-native-typescript-transformer",
//     ),
//   },
// };

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};