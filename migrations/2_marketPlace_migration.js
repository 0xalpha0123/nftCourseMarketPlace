const MarketplaceMigration = artifacts.require("CourseMarketPlace");

module.exports = function (deployer) {
  deployer.deploy(MarketplaceMigration);
};
