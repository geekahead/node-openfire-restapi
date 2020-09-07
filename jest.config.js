module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    // testRegex: '(/test/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}