import * as Yup from 'yup';

import Product from '../models/Product';
import File from '../models/File';
import SaleStock from '../models/SaleStock';

class ProductController {
  async index({ res }) {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'price'],
      include: [
        {
          model: File,
          as: 'img',
          attributes: ['name', 'path'],
        },
      ],
    });
    return res.json(products);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      price: Yup.number().required(),
      img_id: Yup.number(),
      name: Yup.string().required(),
      amount: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, price, amount, img_id } = req.body;

    const product = await Product.create({
      img_id,
      name,
      price,
    });

    await SaleStock.create({
      product_id: product.id,
      amount,
    });

    return res.json(product);
  }
}

export default new ProductController();
