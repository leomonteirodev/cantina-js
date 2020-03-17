import User from '../models/User';
import Core from '../models/Core';

class UserController {
  async index({ res }) {
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
    const { email, core_id, password } = req.body;

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

    if (req.body.operator && req.body.operator !== null) {
      return res
        .status(401)
        .json({ error: 'Simple users cannot be operators' });
    }

    if (password && password !== null) {
      return res.status(401).json({ error: 'Users cannot have a password' });
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

  async update(req, res) {
    const { email } = req.body;

    const user = await User.findOne({
      where: {
        id: req.params.id,
        operator: false,
      },
    });

    if (!user) {
      return res.status(400).json({ error: 'User does not exists' });
    }

    const mailExists = await User.findOne({ where: { email } });

    if (mailExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const { id, name, balance } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      balance,
    });
  }

  async destroy(req, res) {
    const user = await User.findOne({
      where: {
        id: req.params.id,
        operator: false,
      },
    });

    if (!user) {
      return res.status(400).json({ error: 'User does not exists' });
    }

    await user.destroy();

    return res.send();
  }
}

export default new UserController();
