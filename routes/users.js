import express  from "express";

import {updateUser, deleteUser, getUser, getUsers} from "../controllers/user.js"
import { verifyToken,verifyUser, verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//!  checking Authentication
router.get("/checkauthentication", verifyToken,(req,res,next)=>{
    res.send("Hello User , You are Logged in..!")
})

//!  Checking Valid user
router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
    res.send("Hello User, You are logged in and you can delete your account..!")
})

//! Checking isAdmin
router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
    res.send("Hello Admin , You are logged in and you can delete anyone accounts..!")
})

//Update
router.put("/:id", verifyUser, updateUser);
//DELETE
router.delete("/:id", verifyUser, deleteUser);
//GET
router.get("/:id", verifyUser, getUser);
//GET ALL
router.get("/:id", verifyAdmin,  getUsers);

export default router;