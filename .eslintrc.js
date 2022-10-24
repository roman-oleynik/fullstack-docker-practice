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
    "eqeqeq": "error",
    "curly": "error",
    "quotes": ["error", "single"],
    "camelcase": "error",
    "no-console": "error",
    "max-params": ["error", 3],
    "no-alert": "error",
    "comma-spacing": ["error", { "before": false, "after": true }],
    "indent": ["error", 2],
    "jsx-quotes": ["error", "prefer-double"],
    "max-len": [
      "error",
      {
        "code": 120,
        "ignoreComments": true,
        "ignoreTrailingComments": true,
        "ignoreUrls": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
        "ignoreRegExpLiterals": true
      }
    ]
  }
}
