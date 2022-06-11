const path = require("path");

module.exports = {
  extensions: ["*", ".js", ".jsx", ".json"],
  alias: {
    "~": path.resolve(__dirname, "src"),
  },
};
