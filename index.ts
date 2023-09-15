import express, { Express } from 'express';
import dotenv from 'dotenv';
import { DefaultController } from './src/controllers/DefaultController';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.set('views', __dirname + '/../views');
app.set('view engine', 'ejs');

/**
 * ----
 * Controllers
 * ----
 */
app.use(DefaultController.router);

app.listen(port, () => {
  console.log(`[server]: Server is running at port ${port}`);
});