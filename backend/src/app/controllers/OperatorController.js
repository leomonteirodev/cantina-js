import User from '../models/User';

class OperatorController {
  async store(req, res) {
    return res.json({ ok: true });
  }
}

export default new OperatorController();
