import express,{json} from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import 'dotenv/config'


const app = express()

app.use(cors())
app.use(json())
app.use(routes)

app.listen(process.env.PORT, () => {
  console.log('Ouvindo a porta 4000');
});


