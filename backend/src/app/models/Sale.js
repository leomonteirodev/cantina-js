import { Model } from 'sequelize';

class Sale extends Model {
  static init(sequelize) {
    super.init({}, { sequelize });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Cashier, { foreignKey: 'cashier_id', as: 'cashier' });
    this.belongsTo(models.PaymentMethod, {
      foreignKey: 'payment_id',
      as: 'payment',
    });
  }
}

export default Sale;
