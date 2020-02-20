module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cashiers', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      opening: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      withdrawal: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      },
      deposit: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      },
      closure: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      responsible: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      obs: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('cashiers');
  },
};
