import app from './app.js'
import connecttoDB from './config/db.js';
import {v2 as cloudinary} from "cloudinary"

const PORT=process.env.PORT || 5000;
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})
app.listen(PORT,async()=>{
    
    console.log(`App running on http://localhost:${PORT}`);
    await connecttoDB();
})
