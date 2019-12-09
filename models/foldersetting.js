'use strict';
module.exports = (sequelize, DataTypes) => {
  const FolderSetting = sequelize.define(
    'FolderSetting',
    {
      folderId: DataTypes.INTEGER,
      allowFollowers: DataTypes.BOOLEAN,
      passwordProtected: DataTypes.BOOLEAN,
      password: DataTypes.STRING,
      showRevisionNotes: DataTypes.BOOLEAN
    },
    {}
  );
  FolderSetting.associate = function(models) {
    FolderSetting.belongsTo(models.Folder);
  };
  return FolderSetting;
};
