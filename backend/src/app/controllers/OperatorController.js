import jwt from 'jsonwebtoken';

import User from '../models/User';
import Core from '../models/Core';

import authConfig from '../../config/auth';

class OperatorController {
  async index(req, res) {
    const operators = await User.findAll({
      where: { operator: true },
      attributes: ['id', 'name', 'email', 'balance'],
      include: [
        {
          model: Core,
          as: 'core',
          attributes: ['id', 'name'],
        },
      ],
    });
    return res.json(operators);
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

    req.body.operator = true;

    const { id, name, balance, operator } = await User.create(req.body);

    return res.json({
      user: {
        id,
        name,
        balance,
        operator,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new OperatorController();
