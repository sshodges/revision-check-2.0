'use strict';
module.exports = (sequelize, DataTypes) => {
  const Scan = sequelize.define(
    'Scan',
    {
      scannedBy: DataTypes.STRING,
      revisionId: DataTypes.INTEGER
    },
    {}
  );
  Scan.associate = function(models) {
    Scan.belongsTo(models.Revision);
  };
  return Scan;
};
