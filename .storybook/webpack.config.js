module.exports = ({ config }) => ({
  ...config,
  module: {
    ...config.module,
    rules: [
      ...config.module.rules,
      {
        test: /\.(ts|tsx)$/,
        loader: require.resolve("babel-loader"),
        options: {
          presets: [["react-app", { flow: false, typescript: true }]]
        }
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: require.resolve("awesome-typescript-loader")
          },
        ]
      }
    ]
  },
  resolve: {
    ...config.resolve,
    extensions: [...config.resolve.extensions, ".ts", ".tsx"]
  }
});
