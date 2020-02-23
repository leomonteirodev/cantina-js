import User from '../models/User';
import Core from '../models/Core';

class UserController {
  async index(req, res) {
    const user = await User.findAll({
      where: { operator: false },
      attributes: ['id', 'name', 'email', 'balance'],
      include: [
        {
          model: Core,
          as: 'core',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(user);
  }

  async store(req, res) {
    const { email, core_id } = req.body;

    const userExists = await User.findOne({
      where: { email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const coreExists = await Core.findOne({
      where: { id: core_id },
    });

    if (!coreExists) {
      return res.status(401).json({ error: 'Core does not exists' });
    }

    const { id, name, balance, operator } = await User.create(req.body);

    return res.json({
      user: {
        id,
        name,
        balance,
        operator,
      },
    });
  }
}

export default new UserController();
