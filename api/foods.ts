import express from "express";
import mysql from  "mysql";
import {conn,queryAsync} from "../dbconn";
import { json } from "body-parser";
import { UserPostResp } from "../model/user_post_resp";
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
    const fid = req.query.id;
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
    let sql = "select img from foods order by RAN() limit:2"

});
