module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: "eslint:recommended",
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: "module"
  },
  plugins: ["react", "react-native"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "react-native/no-unused-styles": 2,
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": "error"
  }
};
