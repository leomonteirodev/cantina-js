module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('cashiers', 'core_id', {
      type: Sequelize.INTEGER,
      references: { model: 'cores', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('cashiers', 'core_id');
  },
};
