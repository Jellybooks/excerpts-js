module.exports = {
  env: {
    // This should be the config for legacy ES5 (iOS 9) but 
    legacy: {
      presets: [
        [
          "@babel/preset-env", {
            debug: false,
            targets: {
              "ie": "11",
              "ios": "9"
            },
            // If we want to support IE11, entry seems to be less buggy
            // cf. https://calendar.perfplanet.com/2018/doing-differential-serving-in-2019/
            useBuiltIns: "usage",
            corejs: {
              "version": 3
            }
          }
        ],
        "@babel/preset-typescript"
      ],
      plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread"
      ],
      // cf. https://github.com/webpack/webpack/issues/4039
      // and https://babeljs.io/docs/en/options#sourcetype
      sourceType: "unambiguous"
    },
    // This is the config effectively used for the ES2015 build
    modern: {
      presets: [
        [
          "@babel/preset-env", {
            // debug: true can be used to see what ES polyfills babel adds to the build
            // in each TS file, and for which targets
            debug: false,
            targets: {
              "chrome": "70",
              "edge": "18",
              "firefox": "69",
              "ios": "10.3",
              "samsung": "6.2"
            },
            useBuiltIns: "usage",
            corejs: {
              "version": 3
            }
          }
        ],
        "@babel/preset-typescript"
      ],
      plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread"
      ],
      // cf. https://github.com/webpack/webpack/issues/4039
      // and https://babeljs.io/docs/en/options#sourcetype
      sourceType: "unambiguous"
    }
  }
}