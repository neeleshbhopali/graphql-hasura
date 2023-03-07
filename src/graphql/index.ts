import 'reflect-metadata';
import path from 'path';
import { ApolloServer, Config, ExpressContext } from 'apollo-server-express';
import { BuildSchemaOptions, buildSchema } from 'type-graphql';

const apolloServer = async () => {
  const resolvers = path.join(__dirname, './resolvers/**/index.{ts,js}');
  const apolloSchemaOptions: BuildSchemaOptions = {
    resolvers: [resolvers],
    validate: false,
  };
  const apolloSchema = await buildSchema(apolloSchemaOptions);

  return new ApolloServer({
    schema: apolloSchema,
    playground: true,
    introspection: true,
    formatError,
    context: ({ req, res }) => ({ req, res })
  } as Config<ExpressContext>);
};

const formatError = (error) => {
  const errorDetails = error.message.startsWith("{") ? JSON.parse(error.message) : error.message;
  return {
    errorCode: errorDetails.code ?? 500,
    message: errorDetails.text || "Internal server error",
    // locations: error.locations,
    // stack: error.stack ? error.stack.split('\n') : [],
    // path: error.path,
  }
}
export default apolloServer;
