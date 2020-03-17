import Sequelize, { Model } from 'sequelize';

class SaleItem extends Model {
  static init(sequelize) {
    super.init(
      {
        total_amount: Sequelize.INTEGER,
        total_price: Sequelize.FLOAT,
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Sale, { foreignKey: 'sale_id', as: 'sale' });
    this.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
  }
}

export default SaleItem;
