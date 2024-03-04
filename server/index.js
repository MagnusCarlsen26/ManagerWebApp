import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Apis from './routes/Apis.js'
const app = express()

app.use(cors())
app.use(express.json())
app.use('/',Apis)

const CONNECTION_URL = 'mongodb+srv://khushalsindhav26:3TRgfIDORuPj9BbV@cluster0.6okwiup.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
 
mongoose.connect(CONNECTION_URL, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB')
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message)
})
 
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})