module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', 'd.ts', '.ts'],
        moduleDirectory: ['node_modules', './src'],
      },
    },
  },
  rules: {
    'import/extensions': 'off',
		"import/no-unresolved": "off",
    'import/no-import-module-exports': 'off',
    'import/prefer-default-export': 'off',
  },
};
