import Sequelize from 'sequelize';

// => Models
import User from '../app/models/User';
import File from '../app/models/File';
import Product from '../app/models/Product';
import Core from '../app/models/Core';
import Cashier from '../app/models/Cashier';
import Sale from '../app/models/Sale';
import SaleItem from '../app/models/SaleItem';
import SaleStock from '../app/models/SaleStock';
import Input from '../app/models/Input';
import InputStock from '../app/models/InputStock';
import PaymentMethod from '../app/models/PaymentMethod';

import databaseConfig from '../config/database';

// => Models to connect
const models = [
  Core,
  Cashier,
  User,
  Sale,
  SaleItem,
  SaleStock,
  Product,
  File,
  Input,
  InputStock,
  PaymentMethod,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
