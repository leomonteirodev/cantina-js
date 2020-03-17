import * as Yup from 'yup';

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
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      balance: Yup.number(),
      core_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

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
    return res.json();
  }

  async destroy(req, res) {
    return res.send();
  }
}

export default new UserController();
