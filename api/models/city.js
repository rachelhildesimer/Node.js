import mongoose from "mongoose";

const citySchema = new mongoose.Schema({

    nameCity: String,

    apartments: [{
        type: mongoose.Types.ObjectId,
        ref: 'Apartment'

    }]
}
)
export default mongoose.model('City', citySchema)
   