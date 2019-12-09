'use strict';
module.exports = (sequelize, DataTypes) => {
  const Revision = sequelize.define(
    'Revision',
    {
      documentId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      revcode: DataTypes.STRING,
      notes: DataTypes.STRING
    },
    {}
  );
  Revision.associate = function(models) {
    Revision.belongsTo(models.User);
    Revision.belongsTo(models.Document);
    Revision.hasMany(models.Scan);
  };
  return Revision;
};
