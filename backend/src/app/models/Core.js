import Sequelize, { Model } from 'sequelize';

class Core extends Model {
  static init(sequelize) {
    super.init(
      {
        cnpj: Sequelize.STRING,
        name: Sequelize.STRING,
      },
      { sequelize }
    );
    return this;
  }
}

export default Core;
