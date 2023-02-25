import express  from "express";
import { countByCity, countByType, createHotel, deleteHotel, getHoetlRooms, getHotel, getHotels, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";


const router = express.Router();


//CREATE
router.post("/", verifyAdmin, createHotel );




//UPDATE
router.put("/:id", verifyAdmin, updateHotel);



//DELETE
router.delete("/:id",verifyAdmin, deleteHotel )


//GET
router.get("/find/:id", getHotel);



//GET ALL
router.get("/", getHotels);


// For showing no. of city and count of city by their type
router.get("/countByCity", countByCity);

router.get("/countByType", countByType);

router.get("/room/:id", getHoetlRooms )


export default router;