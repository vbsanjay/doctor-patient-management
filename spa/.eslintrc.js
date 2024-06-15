module.exports = {
  parser: '@typescript-eslint/parser',  // Specifies the ESLint parser
  extends: [
    'plugin:react/recommended',  // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from @typescript-eslint/eslint-plugin
    "plugin:prettier/recommended",
    'prettier'
  ],
  plugins: ["prettier"],
  globals: {
    'fetch': false,
    'localStorage': false,
    'it': false
  },
  parserOptions: {
    ecmaVersion: 2018,  // Allows for the parsing of modern ECMAScript features
    sourceType: 'module',  // Allows for the use of imports
    ecmaFeatures: {
      jsx: true,  // Allows for the parsing of JSX
    },
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    'semi': 0,
    'react/prop-types': 0,
    'max-len': [2, 120, 4, {"ignoreUrls": true}],
    "prettier/prettier": "error"
  },
  settings: {
    react: {
      version: '16',  // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
}
