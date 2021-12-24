module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: [
    'standard',
    'plugin:vue/essential'
  ],
  parserOptions:
  {
    parser: 'babel-eslint'
  },
  parser: 'vue-eslint-parser',
  rules:
  {
    'no-console': 1,
    'no-restricted-syntax': [
      'error',
      {
        selector: "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
        message: 'Unexpected property on console object was called'
      }
    ],
    'no-unused-vars': 0,
    'no-tabs': 'off',
    'no-mixed-spaces-and-tabs': 0
  },
  globals:
  {
    document: true,
    localStorage: true,
    window: true
  }
}
