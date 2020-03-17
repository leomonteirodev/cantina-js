import Product from '../models/Product';
import File from '../models/File';
import SaleStock from '../models/SaleStock';

class ProductController {
  async index({ res }) {
    const stock = await SaleStock.findAll({
      attributes: ['amount'],
      include: [
        {
          model: Product,
          as: 'product',
          attributes: ['id', 'name', 'price'],
          include: [
            {
              model: File,
              as: 'img',
              attributes: ['path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(stock);
  }

  async store(req, res) {
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

    return res.status(201).json(product);
  }

  async update(req, res) {
    const { img_id, name, price, amount } = req.body;
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(400).json({ error: 'Product does not exists' });
    }

    await product.update({
      img_id,
      name,
      price,
    });

    const stock = await SaleStock.findOne({
      where: { product_id: req.params.id },
    });

    await stock.update({ amount });
    return res.json(product);
  }

  async destroy(req, res) {
    return res.json();
  }
}

export default new ProductController();
