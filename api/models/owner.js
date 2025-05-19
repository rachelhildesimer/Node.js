import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({

email:{
    type:String,
    require:true,
    
},
password:String,
phone:{
    type:String,
    maxLength:10
},
moreTelephone:{
    type:String,
    maxLength:10
},
apartmens:[{
   type : mongoose.Types.ObjectId,
   ref:'Apartment',
   require:false

   
}]}  
)
export default mongoose.model('Owner',ownerSchema) 
