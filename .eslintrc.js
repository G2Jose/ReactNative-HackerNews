module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'prettier/flowtype',
    'prettier/react',
    'prettier/standard',
  ],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  plugins: ['react'],
  parser: '@typescript-eslint/parser',

  rules: {
    'react/no-unescaped-entities': 0,
    'react/jsx-props-no-spreading': 0,
    'react/destructuring-assignment': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/no-unresolved': [2, { caseSensitive: false }],
    'no-console': [
      'warn',
      {
        allow: ['info', 'warn', 'error'],
      },
    ],
    'react/jsx-uses-vars': 1,
    'react/prop-types': 0,
    'react/prefer-stateless-function': 2,
    'import/extensions': 0,
    'react/jsx-filename-extension': 0,
    'import/prefer-default-export': 0,
    'import/first': 0,
    'no-use-before-define': 0,
    'no-underscore-dangle': 0,
    'react/jsx-no-bind': 0,
    camelcase: 0,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
