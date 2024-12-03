import mongoose, { Mongoose } from "mongoose";

const MeetingSchema = new mongoose.Schema(
{
    manager_Id : { type: String, required : true,  },
    team_member : { type: String , required : true },
    time_slot : {type : Date, required : true },
    duration: { type: Number,required : true, enum:[30,60]},
    staff_id : { type: String,required : true},
},{
    timestamps : true,
});

const Meeting = mongoose.model('Meeting',MeetingSchema);

export default Meeting;