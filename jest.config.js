// module.exports = {
//     preset: 'ts-jest/presets/js-with-ts',
//     transform: {
//         '^.+\\.tsx?$': 'ts-jest',
//     },
//     // testRegex: '(/test/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
//     moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
// }

module.exports = {
    "roots": [
      "<rootDir>/lib"
    ],
    "testMatch": [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
  }