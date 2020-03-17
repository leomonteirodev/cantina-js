import Sequelize, { Model } from 'sequelize';

class InputStock extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: Sequelize.INTEGER,
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Input, { foreignKey: 'input_id', as: 'input' });
  }
}

export default InputStock;
