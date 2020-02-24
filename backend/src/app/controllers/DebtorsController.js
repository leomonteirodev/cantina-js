import { Op } from 'sequelize';

import User from '../models/User';
import Core from '../models/Core';

import Mail from '../../lib/Mail';

class DebtorsController {
  async index(req, res) {
    const debtors = await User.findAll({
      where: { balance: { [Op.lt]: 0 } },
      include: [
        {
          model: Core,
          as: 'core',
          attributes: ['name'],
        },
      ],
    });

    debtors.map(async debtor => {
      const { name, email, balance } = debtor;

      await Mail.sendMail({
        to: email,
        subject: 'Lembrete - Saldo negativo',
        template: 'debt-reminder',
        context: {
          name,
          balance: -balance,
          core: debtor.core.name,
        },
      });
    });

    return res.json(debtors);
  }
}

export default new DebtorsController();
