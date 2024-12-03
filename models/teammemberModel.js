import mongoose, { Mongoose } from "mongoose";

const teammemberSchema = new mongoose.Schema({

    managerId : { type: mongoose.Schema.Types.ObjectId, required : true },
    name : { type: String, required : true },
    position : { type: String, required : true },
},{
    timestamps: true
});

const teamMember = mongoose.model('teamMember',teammemberSchema)

export default teamMember;