import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
                 
nameCategory:String,
apartments:[{
   type : mongoose.Types.ObjectId,
   ref:'Apartment'
   
}]}  
)
export default mongoose.model('Category',categorySchema)
