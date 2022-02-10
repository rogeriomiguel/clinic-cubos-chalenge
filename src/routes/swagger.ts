import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger/swagger.json';

const routes = Router();

routes.use('/swagger', swaggerUi.serve);
routes.get(
  '/swagger',
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
  })
);

export default routes;
