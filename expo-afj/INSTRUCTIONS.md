rm -rf android ios
yarn
yarn install
yarn expo prebuild
yarn android

yarn add @aries-framework/core@^0.4.0 @aries-framework/react-native@^0.4.0 react-native-fs react-native-get-random-values

https://aries.js.org/guides/0.4/getting-started/set-up