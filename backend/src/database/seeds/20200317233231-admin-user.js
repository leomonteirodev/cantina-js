const bcrypt = require('bcryptjs');

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert('users', [
      {
        core_id: 1,
        name: 'Distribuidora FastFeet',
        email: 'admin@fastfeet.com',
        password_hash: bcrypt.hashSync('123456', 8),
        balance: 85.5,
        operator: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: QueryInterface => {
    return QueryInterface.bulkDelete('users', null, {});
  },
};
