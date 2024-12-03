export const validateMeeting = (req,res,next) => {
    const { duration } = req.body;

    if(![30,60].includes(duration)){
        return res.status(400).json({
            success : false,
            message: "only allow 30 or 60 minute nakub try again kub"
        })
    }
    next();
}
