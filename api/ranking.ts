import express from "express";
import mysql from "mysql";
import { conn } from "../dbconn";
import { json } from "body-parser";

export const router = express.Router();

//router ตัวจัดการเส้นทาง
// router.get("/",(rep,res)=>{
//     res.send("Method Get in index.ts 11111");
// });
router.get("/day1",(req,res)=>{
    let sql = "SELECT * FROM `vote` where datediff(CURDATE(),timestamp) = 0 ORDER BY `vote`.`scroe` DESC";
    conn.query(sql,(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.status(200).json(result);
        }
    });
});
router.get("/day2",(req,res)=>{
    let sql = "SELECT * FROM `vote` where datediff(CURDATE(),timestamp) = 1 ORDER BY `vote`.`scroe` DESC";
    conn.query(sql,(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.status(200).json(result);
        }
    });
});

router.get("/day3",(req,res)=>{
    let sql = "SELECT * FROM `vote` where datediff(CURDATE(),timestamp) = 2 ORDER BY `vote`.`scroe` DESC";
    conn.query(sql,(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.status(200).json(result);
        }
    });
});
router.get("/day4",(req,res)=>{
    let sql = "SELECT * FROM `vote` where datediff(CURDATE(),timestamp) = 3 ORDER BY `vote`.`scroe` DESC";
    conn.query(sql,(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.status(200).json(result);
        }
    });
});
router.get("/day5",(req,res)=>{
    let sql = "SELECT * FROM `vote` where datediff(CURDATE(),timestamp) = 4 ORDER BY `vote`.`scroe` DESC";
    conn.query(sql,(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.status(200).json(result);
        }
    });
});
router.get("/day6",(req,res)=>{
    let sql = "SELECT * FROM `vote` where datediff(CURDATE(),timestamp) = 5 ORDER BY `vote`.`scroe` DESC";
    conn.query(sql,(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.status(200).json(result);
        }
    });
});
router.get("/day7",(req,res)=>{
    let sql = "SELECT * FROM `vote` where datediff(CURDATE(),timestamp) = 6 ORDER BY `vote`.`scroe` DESC";
    conn.query(sql,(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.status(200).json(result);
        }
    });
});
router.get("/",(req,res)=>{
    let sql = "SELECT f.fid, f.name, f.img, f.score, CURDATE() AS date, RANK() OVER (ORDER BY f.score DESC) AS today_rank, COALESCE( (SELECT RANK() OVER (ORDER BY f.score DESC) FROM vote v WHERE v.fid_vid = f.fid AND v.timestamp = DATE_SUB(CURDATE(), INTERVAL 1 DAY)), 0 ) AS yesterday_rank FROM foods f LEFT JOIN vote v ON v.fid_vid = f.fid WHERE v.timestamp = CURDATE() GROUP BY f.fid ORDER BY today_rank ASC LIMIT 10";
    conn.query(sql,(err,result)=>{
        if(err){
            res.status(500).json(err);
        }else{
            res.status(200).json(result);
        }
    });
});