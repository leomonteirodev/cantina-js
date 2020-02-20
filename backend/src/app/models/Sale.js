import { Model } from 'sequelize';

class Sale extends Model {
  static init(sequelize) {
    super.init({}, { sequelize });
  }
}

export default Sale;
