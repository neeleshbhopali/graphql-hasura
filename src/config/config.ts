import Joi from 'joi';

const loadConfig = (schema: Joi.ObjectSchema, envs: NodeJS.ProcessEnv) => {
  const { error, value: envVars } = schema.validate(envs, {
    abortEarly: true,
  });

  if (error) {
    throw new Error(`Environment variables validation error: ${error.message}`);
  }

  return {
    port: envVars.PORT,
    hasura_url: envVars.HASURA_URL,
    secret: envVars.ACCESS_TOKEN_PRIVATE_KEY,
    admin_pass: envVars.ADMIN_PASS
  };
};

export default loadConfig;
