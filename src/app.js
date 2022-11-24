import express,{json} from 'express';
import cors from 'cors';
import routes from './routes';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()


const app = express()

app.use(cors())
app.use(json())
app.use(routes)

app.listen(PORT, () => {
  console.log('Ouvindo a porta 4000');
});


