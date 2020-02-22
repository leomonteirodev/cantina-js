import Sequelize, { Model } from 'sequelize';

class Cashier extends Model {
  static init(sequelize) {
    super.init(
      {
        opening: Sequelize.FLOAT,
        withdrawal: Sequelize.FLOAT,
        deposit: Sequelize.FLOAT,
        closure: Sequelize.FLOAT,
        responsible: Sequelize.STRING,
        obs: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Core, { primaryKey: 'core_id', as: 'core' });
  }
}

export default Cashier;
