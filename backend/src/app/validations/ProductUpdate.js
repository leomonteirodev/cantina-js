import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      price: Yup.number(),
      img_id: Yup.number(),
      name: Yup.string(),
      amount: Yup.number(),
    });

    await schema.validate(req.body, { abortEarly: true });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
