module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  globals: {
    'echarts': true
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': ["error", { "props": false }],
    'no-underscore-dangle': ["error", { "allowAfterThis": true }]
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
