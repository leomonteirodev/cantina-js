class OperatorController {
  async index(req, res) {
    return res.json({ ok: true });
  }
}

export default new OperatorController();
