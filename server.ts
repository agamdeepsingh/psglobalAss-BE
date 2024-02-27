import express, { Response, Request, Application } from 'express'
import mongoose from 'mongoose';

import bodyParser from 'body-parser';
import productRoutes from '../psglobalAss-BE/src/Routes/product'
import userRoutes from '../psglobalAss-BE/src/Routes/user'
import reviewRoutes from '../psglobalAss-BE/src/Routes/review'
import orderRoutes from '../psglobalAss-BE/src/Routes/order'


const app: Application = express()
const PORT = 5050;

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://agam:12345@cluster0.foupwvt.mongodb.net/'),

app.use(express.json())

app.use('/product', productRoutes)
app.use('/user', userRoutes)
app.use('/review', reviewRoutes)
app.use('/order', orderRoutes)

app.all('*', (req: Request, res: Response) => {
  res.status(200).send('<h1>This website is for API 🤯</h1>')
})

const server = app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`,
  )
})
