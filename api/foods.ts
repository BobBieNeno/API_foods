import express from "express";
import mysql from  "mysql";
import {conn,queryAsync} from "../dbconn";
import { json } from "body-parser";
import { UserPostResp } from "../model/user_post_resp";
import { Date } from "../model/user_post_resp";
export const router = express.Router();

//router ตัวจัดการเส้นทาง
router.get("/",(req,res)=>{
    const sql = "select * from foods";
    conn.query(sql,(err,result)=>{
        if(err){
            res.status(400).json(err);
        }else{
            res.status(200).json(result);
        }
    });

    // sql = mysql.forma(,[]);
});
router.put("/score",(req,res)=>{
    const fid = req.query.fid;
    const score = req.query.score;
    let sql = "update `foods` set `score` = ? where `fid` = ?";
    sql = mysql.format(sql,[
        score,
        fid
    ]);
    conn.query(sql,(err,result)=>{
        if(err){
            res.status(400).json(err);
        }else{
            res.status(200).json({row : result.affectedRows,
            data : "update Score Seccess_full!!"});
        }
    });
});
router.get("/random",(req,res)=>{
    let sql = "select fid,score,img,name from foods ORDER BY RAND() LIMIT 2";
   conn.query(sql,(err,result)=>{
    if(err) throw err;
    res.status(200).json(result);
   });

});
router.get("/ranking",(req,res)=>{
    let sql  = "SELECT *  from user INNER JOIN foods on foods.uid_fid ORDER BY foods.score DESC";
    conn.query(sql,(err,result)=>{
        if(err) throw err;
        res.status(200).json(result);
    });
   
    
});
// new Date()
router.post("/vote",(req,res)=>{
    // const fid = req.query.id;
    // const date:any = req.query.date;
    // const score = req.query.score;
    let date: Date=  req.body;
    let sql  =  "INSERT INTO `vote`(`fid_vid`, `timestamp`, `scroe`) VALUES (?,?,?)";
    sql = mysql.format(sql,[
        date.fid,
        date.date,
        date.score]);
    conn.query(sql,(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.status(200).json({
                vote:  "ful !!!!",
                affected_row:result.affectedRows
            });
        }
    });
});
router.get("/getdate",(req,res)=>{
    let sql = "SELECT CURRENT_DATE";
    conn.query(sql,(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.status(200).json(result);
        }
    });

});
// SELECT * FROM `vote` where timestamp = CURRENT_DATE() ORDER BY `vote`.`scroe` DESC
