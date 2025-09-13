import mongoose from "mongoose";

// 1 create schema
// 2 model based on schema

const noteSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        content:{
            type:String,
            required:true,
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"auth",
            required:true,
        }
    },
    {timestamps:true} //created and updated date get from mongodb
)
const Note = mongoose.model("Note", noteSchema)
export default Note