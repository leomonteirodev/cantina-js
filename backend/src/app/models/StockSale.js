import Sequelize, { Model } from 'sequelize';

class StockSale extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: Sequelize.INTEGER,
      },
      { sequelize }
    );
    return this;
  }
}

export default StockSale;
