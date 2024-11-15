module.exports = {
  "output": {
    "filename": "[name].pack.js"
  },
  "resolve": {
    "extensions": [
      ".js",
      ".json"
    ],
    "alias": {}
  },
  "module": {
    "rules": [
      {
        "use": {
          "loader": "babel-loader",
          "options": {
            "presets": [
              "babel-preset-env",
              "babel-preset-react"
            ],
            "plugins" : ["babel-plugin-transform-object-rest-spread"]
          }
        },
        "exclude": /node_modules/,
        "test": /\.js$/
      }
    ]
  },
  "entry": {
    "index": "./index"
  }
}