import { Op } from 'sequelize';

import User from '../models/User';
import Core from '../models/Core';

import Queue from '../../lib/Queue';
import DebtReminderMail from '../jobs/DebtReminderMail';

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

    await Queue.add(DebtReminderMail.key, {
      debtors,
    });

    return res.json(debtors);
  }
}

export default new DebtorsController();
