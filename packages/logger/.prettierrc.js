const rootConfig = require("../config/prettier.config");

module.exports = {
  ...rootConfig,
  importOrderParserPlugins: ["typescript", "decorators-legacy"],
};
