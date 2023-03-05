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
    context: ({ req, res }) => ({ req, res })
  } as Config<ExpressContext>);
};

export default apolloServer;
