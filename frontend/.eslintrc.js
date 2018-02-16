module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['react', 'import', 'jsx-a11y', 'flowtype'],
  rules: {
    semi: ['error', 'never'],
    'react/prop-types': ['off'],
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    'no-console': ['warn', { allow: ['info', 'error'] }],
    'arrow-parens': ['error', 'always']
  },
  globals: {
    document: true,
    URL: true,
    window: true,
    fetch: true,
    navigator: true,
    Element: true,
    Class: true,
    React$Component: true,
    React$Element: true,
    SyntheticInputEvent: true,
    HTMLInputElement: true
  }
};
