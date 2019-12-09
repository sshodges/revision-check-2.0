'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DocumentSettings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      documentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Documents',
          key: 'id'
        }
      },
      allowFollowers: {
        type: Sequelize.BOOLEAN
      },
      passwordProtected: {
        type: Sequelize.BOOLEAN
      },
      password: {
        type: Sequelize.STRING
      },
      showRevisionNotes: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('DocumentSettings');
  }
};
