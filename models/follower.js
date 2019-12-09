'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define(
    'Follower',
    {
      documentId: DataTypes.INTEGER,
      email: DataTypes.STRING,
      verified: DataTypes.BOOLEAN
    },
    {}
  );
  Follower.associate = function(models) {
    Follower.belongsTo(models.Document);
  };
  return Follower;
};
