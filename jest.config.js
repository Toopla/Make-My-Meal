// jest.config.js

module.exports = {
    transform: {
        "^.+\\.jsx?$": "babel-jest",
        "^.+\\.css$": "<rootDir>/config/cssTransform.js",
        "^.+\\.svg$": "<rootDir>/config/fileTransform.js",
        "^.+\\.src\\.js?$": "babel-jest",
        "^.+\\.js?$": "babel-jest",
        "^.+\\.mdx$": "@storybook/addon-docs/jest-transform-mdx",
        "\\.(jpg|jpeg|png|gif|webp)$": "<rootDir>/config/fileTransform.js",
        "^src/(.*)$": "<rootDir>/src/$1"
    },
    testMatch: ['<rootDir>/src/**/*.test.js']
};
