import Product from '../models/Product';
import StockSale from '../models/StockSale';

class ProductController {
  async index(req, res) {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'price'],
      include: [
        {
          model: 'files',
          as: 'img',
          attributes: ['name', 'path'],
        },
      ],
    });
    return res.json(products);
  }

  async store(req, res) {
    const product = await Product.create(req.body);
    return res.json(product);
  }
}

export default new ProductController();
