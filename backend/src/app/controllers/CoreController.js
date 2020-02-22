import Core from '../models/Core';

class CoreController {
  async store(req, res) {
    /* const checkIsOperator = await User.findOne({
      where: { id: req.userId, operator: true },
    });
    if (!checkIsOperator) {
      return res.status(401).json({ error: 'User is not an operator' });
    } */
    const core = await Core.create(req.body);
    return res.json(core);
  }
}

export default new CoreController();
