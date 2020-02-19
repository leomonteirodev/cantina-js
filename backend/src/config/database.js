export default {
  dialect: 'postgres',
  host: 'localhost',
  username: 'cantinadb',
  password: 'dockercantina',
  database: 'cantinadb',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
