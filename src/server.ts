import express, {Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';

import { auth } from './routes/auth/routes.auth';
import { main } from './routes/main/routes.main';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(auth);
app.use(main);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});