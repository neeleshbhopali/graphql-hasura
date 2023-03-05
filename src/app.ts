import express from 'express';
import config from './config';
import apolloServer from './graphql';

const { port } = config;

const app = express();

const start = async (port: number): Promise<void> => {
  const server = await apolloServer();
  await server.start()
  server.applyMiddleware({ app, path: '/graphql' });

  return new Promise<void>((resolve) => {
    app.listen(port, async () => {
      console.log(`Application listening at port ${port}`);
      resolve();
    });
  });
};

start(port);
