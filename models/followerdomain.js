'use strict';
module.exports = (sequelize, DataTypes) => {
  const FollowerDomain = sequelize.define(
    'FollowerDomain',
    {
      documentId: DataTypes.INTEGER,
      domain: DataTypes.STRING
    },
    {}
  );
  FollowerDomain.associate = function(models) {
    FollowerDomain.belongsTo(models.Document);
  };
  return FollowerDomain;
};
