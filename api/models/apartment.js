import mongoose from "mongoose";

const apartmentSchema = new mongoose.Schema({

    nameApart: {
        type: String,
        require: false
    },

    description: String,

    pic: String,
    codeCategory: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },

    codeCity: {
        type: mongoose.Types.ObjectId,
        ref: "City"
    },
    addres: String,
    numBeds: Number,
    options: [{
        type: String
    }],
    price: Number,
    codeOwner: {
        type: mongoose.Types.ObjectId,
        ref: "Owner"
    }
}
)
export default mongoose.model('Apartment', apartmentSchema)
