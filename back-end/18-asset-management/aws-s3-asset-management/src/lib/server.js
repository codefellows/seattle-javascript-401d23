'use strict';

import express from 'express';
import mongoose from 'mongoose';
import logger from './logger';
import authRoutes from '../route/auth-router';
import profileRoutes from '../route/profile-router';
import soundRoutes from '../route/sound-router';
import errorMiddleWare from './error-middleware';

const app = express();
let server = null;

// #1 in chain
app.use(authRoutes);
app.use(profileRoutes);
app.use(soundRoutes);

// chain 2
app.all('*', (request, response) => {
  logger.log(logger.INFO, 'SERVER: Returning a 404 from the catch-all/default route');
  return response.sendStatus(404);
});

// chain 3
app.use(errorMiddleWare);

const startServer = () => {
  return mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      server = app.listen(process.env.PORT, () => {
        logger.log(logger.INFO, `Server is listening on port ${process.env.PORT}`);
      });
      return undefined;
    })
    .catch((err) => {
      logger.log(logger.ERROR, `something happened, ${JSON.stringify(err)}`);
    });
};

const stopServer = () => {
  return mongoose.disconnect()
    .then(() => {
      return server.close(() => {
        logger.log(logger.INFO, 'Server is off');
      });
    })
    .catch((err) => {
      return logger.log(logger.ERROR, `something happened, ${JSON.stringify(err)}`);
    });
};

export { startServer, stopServer };

