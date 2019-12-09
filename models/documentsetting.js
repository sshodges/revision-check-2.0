'use strict';
module.exports = (sequelize, DataTypes) => {
  const DocumentSetting = sequelize.define(
    'DocumentSetting',
    {
      documentId: DataTypes.INTEGER,
      allowFollowers: DataTypes.BOOLEAN,
      passwordProtected: DataTypes.BOOLEAN,
      password: DataTypes.STRING,
      showRevisionNotes: DataTypes.BOOLEAN
    },
    {}
  );
  DocumentSetting.associate = function(models) {
    DocumentSetting.belongsTo(models.Document);
  };
  return DocumentSetting;
};
