module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/services/api.ts', // Exclui o arquivo 'api.ts' dentro do diretório 'src/services'
    'src/context/UserContext.tsx', // Exclui o arquivo 'UserContext.tsx' dentro do diretório 'src/context'
    'src/tests/', // Exclui o diretório 'tests' dentro do diretório 'src'
  ],
};
