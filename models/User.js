'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      company: DataTypes.STRING,
      parent: DataTypes.INTEGER,
      active: DataTypes.BOOLEAN,
      accountConfirmCode: DataTypes.STRING,
      passwordResetCode: DataTypes.STRING,
      inviteCode: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {
    User.hasMany(models.Folder, { foreignKey: 'userId' });
    User.hasMany(models.Document, { foreignKey: 'userId' });
    User.hasMany(models.Revision, { foreignKey: 'userId' });
  };
  return User;
};
