import Sequelize from 'sequelize';

// MODELS IMPORT
import User from '../app/models/User';
import File from '../app/models/File';
import Product from '../app/models/Product';

// CONFIGS IMPORT
import databaseConfig from '../config/database';

// ALL MODELS
const models = [User, Product, File];

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
