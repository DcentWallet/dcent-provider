module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    //'plugin:vue/recommended',
    'eslint:recommended'
  ],
  // required to lint *.vue files
  plugins: [
    //'vue'
  ],
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'indent': 0,
    'semi': 0,
    'quotes': ["warn", "single", { "avoidEscape": true }],
    'spaced-comment': 0,
    'no-trailing-spaces': 0,
    'comma-dangle': 0,
    'operator-linebreak': 0,
    'keyword-spacing': 0,
    'padded-blocks': 0,
    'space-before-blocks': 0,
    'yoda': 0,
    'no-multi-spaces': 0,
  }
}
