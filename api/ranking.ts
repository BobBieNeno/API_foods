import express from "express";
import mysql from "mysql";
import { conn } from "../dbconn";
import { json } from "body-parser";

export const router = express.Router();

//router ตัวจัดการเส้นทาง
router.get("/",(rep,res)=>{
    res.send("Method Get in index.ts 11111");
});
router.get("/day1",(req,res)=>{
    let sql = "SELECT * FROM `vote` where timestamp = CURRENT_DATE() ORDER BY `vote`.`scroe` DESC";
    conn.query(sql,(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.status(200).json(result);
        }
    });
});
router.get("/day2",(req,res)=>{
    let sql = "SELECT * FROM `vote` where timestamp = CURRENT_DATE()-1 ORDER BY `vote`.`scroe` DESC";
    conn.query(sql,(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.status(200).json(result);
        }
    });
});

router.get("/day3",(req,res)=>{
    let sql = "SELECT * FROM `vote` where timestamp = CURRENT_DATE()-2 ORDER BY `vote`.`scroe` DESC";
    conn.query(sql,(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.status(200).json(result);
        }
    });
});
router.get("/day4",(req,res)=>{
    let sql = "SELECT * FROM `vote` where timestamp = CURRENT_DATE()-3 ORDER BY `vote`.`scroe` DESC";
    conn.query(sql,(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.status(200).json(result);
        }
    });
});
router.get("/day5",(req,res)=>{
    let sql = "SELECT * FROM `vote` where timestamp = CURRENT_DATE()-4 ORDER BY `vote`.`scroe` DESC";
    conn.query(sql,(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.status(200).json(result);
        }
    });
});
router.get("/day6",(req,res)=>{
    let sql = "SELECT * FROM `vote` where timestamp = CURRENT_DATE()-5 ORDER BY `vote`.`scroe` DESC";
    conn.query(sql,(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.status(200).json(result);
        }
    });
});
router.get("/day7",(req,res)=>{
    let sql = "SELECT * FROM `vote` where timestamp = CURRENT_DATE()-6 ORDER BY `vote`.`scroe` DESC";
    conn.query(sql,(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.status(200).json(result);
        }
    });
});