// ESM import，不再用 require
import express from 'express'
import apiRouter from './routes/api.routes.js'
import {notFoundHandler,finalErrorHandler} from './middleware/error.middleware.js'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Express ESM!')
})

app.use((req,res,next)=>{
  console.log(req.method,req.url)
  next()
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api',apiRouter)

app.use(notFoundHandler)

app.use(finalErrorHandler)

app.listen(3000, () => {
  console.log(`Server running at http://localhost:${port}`)
})