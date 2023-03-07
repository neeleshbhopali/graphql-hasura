import joi from 'joi';

export default joi
  .object({
    PORT: joi.string().required(),
    HASURA_URL: joi.string().required(),
    ACCESS_TOKEN_PRIVATE_KEY: joi.string().required(),
    ADMIN_PASS: joi.string().required(),
  })
  .unknown();
