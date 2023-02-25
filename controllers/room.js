import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js"

export const createRoom = async(req,res,next)=>{
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try{
        const savedRoom = await newRoom.save();
        try{
            await Hotel.findByIdAndUpdate(hotelId,{
                $push:{rooms: savedRoom._id},
            });
        }catch(err){
            next(err);
        }
        res.status(200).json(savedRoom);

    }catch(err){
        next(err);
    }

}

export const updateRoom = async (req,res,next)=>{
    try{
        const updateRoom = await Hotel.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new : true}
        );
        res.status(200).json(updateRoom);

    }catch(err){
        next(err);
    }
};

// Updating Room Number with Room ID avaliable not the whole hotel
export const updateRoomAvailability = async (req,res,next)=>{
   try{
    await Room.updateOne({"roomNumbers._id": req.params.id},
    {
        $push:{
            "roomNumbers.$.unavaliableDates": req.body.dates

        },
    });
    res.status(200).json("Room has been Updated.")
   }catch(err){
    next(err);
   }
    
};

export const deleteRoom = async (req,res,next) =>{
    const hotelId = req.params.hotelid;
    try{
        await Room.findByIdAndDelete(req.params.id);
        try{
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull:{rooms: req.params.id},
            });

        }catch(err){
            next(err);
        }
        res.status(200).json("room has Been deleted")

    }catch(err){
        next(err);
    }
};

export const getRoom = async (req,res,next) =>{
    try{
        const room = await Room.findById(req.params.id);
        res.status(200).json(room)

    }catch(err){
        next(err);
    }
}

export const getRooms = async (req,res,next) =>{
    try{
        const rooms = await Room.find();
        res.status(200).json(rooms);
    }catch(err){
        next(err);
    }

}