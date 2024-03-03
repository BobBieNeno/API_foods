import express from "express";

export const router = express.Router();

//router ตัวจัดการเส้นทาง
router.get("/",(rep,res)=>{
    res.send("Method Get in index.ts 11111");
});