import Input from '../models/Input';
import InputStock from '../models/InputStock';

class InputController {
  async index({ res }) {
    const inputs = await Input.findAll();
    return res.json(inputs);
  }

  async store(req, res) {
    const { name, price, amount } = req.body;
    const input = await Input.create({ name, price });

    await InputStock.create({
      input_id: input.id,
      amount,
    });

    return res.status(201).json(input);
  }

  async update(req, res) {
    const input = await Input.findOne({
      where: { id: req.params.id },
    });

    if (!input) {
      return res.status(400).json({ error: 'Input does not exists' });
    }

    await input.update(req.body);

    return res.json(input);
  }

  async destroy(req, res) {
    const input = await Input.findOne({
      where: { id: req.params.id },
    });

    if (!input) {
      return res.status(400).json({ error: 'Input does not exists' });
    }

    await input.destroy();
    return res.send();
  }
}

export default new InputController();
