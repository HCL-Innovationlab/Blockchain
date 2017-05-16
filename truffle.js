var DefaultBuilder = require("truffle-default-builder");
var web3 = require("web3");

module.exports = {
  build: new DefaultBuilder({
    
    "index.html": "index.html",
    "viewClaims.html": "viewClaims.html",
    "blockSnapshot.html": "blockSnapshot.html",
    "transactionDetails.html": "transactionDetails.html",

      "app.css": [
      "stylesheets/bootstrap.min.css",
      "stylesheets/bootstrap-theme.css",
      "stylesheets/docs.min.css",
      "stylesheets/font-awesome.min.css",
      "stylesheets/style.css",
      "stylesheets/unify.css",
      "stylesheets/app.css"
    ],


   "app.js": [
     "javascripts/bootstrap.min.js",
      "javascripts/underscore.js",
      "javascripts/app.js"
    ],

      "images/":"images/",

      "fonts/": "stylesheets/fonts/"
      
  }),
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};