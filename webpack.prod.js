const commonConfig = {
  mode: "production",
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  entry: "./src/index.ts"
};

// Legacy is meant to output to ES5 for older browsers e.g. iOS 9
const legacyConfig = {
  name: "legacy",
  output: {
    filename: "excerpts.es5.js",
    path: __dirname + "/dist",
    library: "excerpts",
    libraryTarget: "var"
  },
  module: {
    rules: [
      { 
        test: /\.(ts|js)?$/,
        loader: "babel-loader",
        exclude: [
          /\bcore-js\b/,
          /\bwebpack\/buildin\b/
        ],
        options: {
          envName: "legacy" // Points to env.legacy in babel.config.js
        }
      }
    ]
  },
  ...commonConfig
};

const modernConfig = {
  name: "modern",
  output: {
    filename: "excerpts.js",
    path: __dirname + "/dist",
    library: "excerpts",
    libraryTarget: "var"
  },
  module: {
    rules: [
      { 
        test: /\.(ts|js)?$/,
        loader: "babel-loader",
        exclude: [
          /\bcore-js\b/,
          /\bwebpack\/buildin\b/
        ],
        options: {
          envName: "modern" // Points to env.modern in babel.config.js
        }
      }
    ]
  },
  ...commonConfig
};

module.exports = [legacyConfig, modernConfig];