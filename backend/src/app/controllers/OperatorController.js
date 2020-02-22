import jwt from 'jsonwebtoken';

import User from '../models/User';

import authConfig from '../../config/auth';

class OperatorController {
  async index(req, res) {
    return res.json();
  }

  async store(req, res) {
    const { email } = req.body;

    const userExists = await User.findOne({
      where: { email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
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
