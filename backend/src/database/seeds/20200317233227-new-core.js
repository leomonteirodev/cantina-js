module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert('cores', [
      {
        cnpj: '34.544.35/0000-01',
        name: 'Distribuidora FastFeet',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: QueryInterface => {
    return QueryInterface.bulkDelete('cores', null, {});
  },
};
