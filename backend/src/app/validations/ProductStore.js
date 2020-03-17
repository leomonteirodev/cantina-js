import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      price: Yup.number().required(),
      img_id: Yup.number(),
      name: Yup.string().required(),
      amount: Yup.number().required(),
    });

    await schema.validate(req.body, { abortEarly: true });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
