import Sequelize, { Model } from 'sequelize';

class Input extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.FLOAT,
      },
      { sequelize }
    );
    return this;
  }
}

export default Input;
