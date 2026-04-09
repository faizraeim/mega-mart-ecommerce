module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.m?js$': 'babel-jest',
  },
  testMatch: ['**/__tests__/**/*.test.js', '**/__tests__/**/*.test.mjs'],
  moduleFileExtensions: ['js', 'mjs', 'cjs', 'json'],
};