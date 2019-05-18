module.exports = {
  exclude: "node_modules/**",
  presets: ["@babel/preset-typescript", "@babel/preset-react", "@babel/preset-env"],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: false
      }
    ],
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread"
  ]
};
