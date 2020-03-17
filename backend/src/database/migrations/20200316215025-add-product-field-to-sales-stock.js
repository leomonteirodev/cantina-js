module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('sale_stocks', 'product_id', {
      type: Sequelize.INTEGER,
      references: { model: 'products', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('sale_stocks', 'product_id');
  },
};
