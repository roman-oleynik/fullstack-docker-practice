module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: [
    'server/*',
    'webpack.config.js',
    '.eslintrc.js'
  ],
  rules: {
    eqeqeq: "off",
    curly: "error",
    quotes: ["error", "single"]
  }
}
