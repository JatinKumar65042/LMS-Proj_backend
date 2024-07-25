import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {config} from 'dotenv';
import morgan from 'morgan';
import UserRoutes from './routes/userRoutes.js';
import CourseRoute from './routes/course.routes.js';
// import paymentRoute from './routes/payment.route.js';
import errorMiddleware from './middlewares/error.middleware.js';
config();
const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials:true
}))

app.use('/api/v1/user', UserRoutes)
app.use('/api/v1/courses', CourseRoute)
// app.use('/api/v1/payments', paymentRoute)



app.use('/ping', function(req,res){
    res.send('Pong');
});

app.use(morgan('dev'));

//routes of 3 modules

app.all('*',(req,res)=>{
    res.status(404).send("OOPS!! 404 page not found");
})

app.use(errorMiddleware);

export default app;