import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: Sequelize.INTEGER,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        balance: Sequelize.FLOAT,
        operator: Sequelize.BOOLEAN,
      },
      { sequelize }
    );
    return this;
  }
}

export default User;
