import {model,Schema} from "mongoose";

const courseSchema= new Schema({
    title:{
        type:String,
        required:[true,'Title is required'],
        minLength:[8,'Title must ne atleast 8 length'],
        maxLength:[59,'Title must be less than 60 characters'],
        trim:true
    },
    description:{
        type:String,
        required:[true,'Description is required'],
        minLength:[8,'Description must ne atleast 8 length'],
        maxLength:[200,'Description must be less than 200 characters'],
    },
    category:{
        type: String,
        required:[true,'Category is required'],
    },
    thumbnail:{
        public_id:{
            type:String,
            required:true,
        },
        secure_url:{
            type:String,
            required:true,
        }
    },
    lectures:[
        {
            title:String,
            description: String,
            lecture:{
                public_id:{
                    type:String,
                    required:true,
                },
                secure_url:{
                    type:String,
                    required:true,
                }
            }
        }
    ],
    numbersofLecture:{
        type:Number,
        default: 0,
    },
    createdBy:{
        type:String,
    },
},{
    timestamps:true
})

const Course=model('Course',courseSchema);

export default Course;