// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
    ...defaultConfig,
    // ... other Metro config options ...
    resolver: {
        ...defaultConfig.resolver,
      // make sure this includes `cjs` (and other extensions you need)
      sourceExts: [...defaultConfig.resolver.sourceExts, 'cjs'],
    },
  }