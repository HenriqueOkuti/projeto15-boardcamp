import joi from 'joi';

const joiString = joi.string().required();
const joiNumber = joi.number().required();
const joiDate = joi.date().required();

const categoriesSchema = joi.object({
  name: joiString.required(),
});

const gameSchema = joi.object({
  name: joiString,
  image: joiString,
  stockTotal: joiNumber.greater(0),
  categoryId: joiNumber,
  pricePerDay: joiNumber.greater(0),
});

const customerSchema = joi.object({
  name: joiString,
  phone: joiString,
  cpf: joiString.length(11),
  birthday: joiDate,
});

export { categoriesSchema, gameSchema, customerSchema };
