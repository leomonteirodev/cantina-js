import Sequelize, { Model } from 'sequelize';

class PaymentMethod extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      { sequelize }
    );
    return this;
  }
}

export default PaymentMethod;
