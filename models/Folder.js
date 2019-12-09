'use strict';
module.exports = (sequelize, DataTypes) => {
  const Folder = sequelize.define(
    'Folder',
    {
      name: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      folderId: DataTypes.INTEGER
    },
    {}
  );
  Folder.associate = function(models) {
    Folder.belongsTo(models.User, { foreignKey: 'userId' });
    Folder.hasMany(models.Document);
    Folder.hasOne(models.FolderSetting);
  };
  return Folder;
};
