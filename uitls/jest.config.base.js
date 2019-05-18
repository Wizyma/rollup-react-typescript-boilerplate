module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest"
  },
  testPathIgnorePatterns: ["test-set.ts", "test-set.tsx", "fixtures"],
  testMatch: ["**/__tests__/**/*.(ts|tsx)?(x)", "**/?(*.)+(spec|test).(ts|tsx)?(x)"]
};
