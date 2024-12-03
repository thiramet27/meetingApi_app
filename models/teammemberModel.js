import mongoose, { Mongoose } from "mongoose";

const teammemberSchema = new mongoose.Schema({

    manager_Id : { type: String, required : true },
    name : { type: String, required : true },
    position : { type: String, required : true },
    staff_id : { type: String,required : true},
},{
    timestamps: true
});

const teamMember = mongoose.model('teammember',teammemberSchema)

export default teamMember;