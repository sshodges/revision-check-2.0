'use strict';
module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define(
    'Document',
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      folderId: DataTypes.INTEGER
    },
    {}
  );
  Document.associate = function(models) {
    Document.belongsTo(models.User);
    Document.belongsTo(models.Folder);
    Document.hasMany(models.Revision);
    Document.hasMany(models.Follower);
    Document.hasMany(models.FollowerDomain);
    Document.hasOne(models.DocumentSetting);
  };
  return Document;
};
