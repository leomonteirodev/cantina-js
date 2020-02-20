import User from '../models/User';

class UserController {
  async store(req, res) {
    const { email } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    try {
      const { id, name, balance, operator } = await User.create(req.body);

      return res.json({
        user: {
          id,
          name,
          balance,
          operator,
        },
      });
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async index(req, res) {
    return res.json();
  }
}

export default new UserController();
