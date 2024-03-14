import express from "express";
import multer from "multer";
import mysql from "mysql";
import path from "path";
import {UserPostResp, imgPostResp, User} from "../model/user_post_resp";

import { ref, getStorage, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {initializeApp} from "firebase/app";
import { conn, queryAsync } from "../dbconn";
import { json } from "body-parser";

export const router = express.Router();

const firebaseConfig = {
    apiKey: "AIzaSyCgGuPOdRe6i6uoVOUxe4SmZLfDiGMJvyY",
    authDomain: "imgprojectadv.firebaseapp.com",
    projectId: "imgprojectadv",
    storageBucket: "imgprojectadv.appspot.com",
    messagingSenderId: "261203533324",
    appId: "1:261203533324:web:230f275205075dc508d829"
  };
  
  
  class FileUploads{
      
      filename = '';
      public readonly diskLoader = multer({
          storage: multer.memoryStorage(),
          limits:{
              
              fileSize: 67108864,
            },
        });
        
    }
    initializeApp(firebaseConfig);
    const storage = getStorage();
const fileuploads = new FileUploads();
router.post("/",fileuploads.diskLoader.single("file"),async (req,res)=>{

    // const boby = req.body;
    const filename = Math.round(Math.random() * 10000) + ".png";
    const storageRef = ref(storage,"/images/"+filename);
    const metaData = { contentType: req.file!.mimetype };
    const snapshot = await uploadBytesResumable(storageRef,req.file!.buffer,metaData);
    const url = await getDownloadURL(snapshot.ref);
   
    let sql = "INSERT INTO `foods`(`uid_fid`, `img`, `score`) VALUES(?,?,?)";
    sql = mysql.format(sql,[
        req.body.uid,
          url,
        100
    ]);
    conn.query(sql,(err,result)=>{
        res.status(200).json({
            uid: req.body.uid,
            url: url
        });
    });
});

router.put("/profile",fileuploads.diskLoader.single("file"),async (req,res)=>{

    const filename = Math.round(Math.random() * 10000) + ".png";
    const storageRef = ref(storage,"/images/"+filename);
    const metaData = { contentType: req.file!.mimetype };
    const snapshot = await uploadBytesResumable(storageRef,req.file!.buffer,metaData);
    const url = await getDownloadURL(snapshot.ref);
   
    let sql = "UPDATE `user` SET `avatar` = ? WHERE `uid` = ?;";
    sql = mysql.format(sql,[
        url,
        req.body.uid
    ]);
    conn.query(sql,(err,result)=>{
        if(err){

        }else{
            res.status(200).json({
                uid: req.body.uid,
                url: url
            });
        }
    });
});
router.put("/:id",async (req,res)=>{
    const id = req.params.id;
 const body:UserPostResp = req.body;
 let sql = "select * from user where uid = ?";
 sql = mysql.format(sql,[ id ]);
 const result = await queryAsync(sql);
 const json = JSON.stringify(result);
 const obj = JSON.parse(json);

 let original :UserPostResp | undefined;
 original = obj[0] as UserPostResp;

 let update = {...original, ...body};
  sql = "UPDATE `user` SET `name`= ?, `type`= ?, `email`= ?, `pass`= ? ,`last_name` = ?  where `uid` = ?";

 sql = mysql.format(sql,[
    update.name,
    update.type,
    update.email,
    update.pass,
    update.last_name,
    id
 ]);
 conn.query(sql,(err,result)=>{
    if(err){
        res.json(err);
    }else{
        res.status(200).json({
            affected_row : result.affectedRows,
            "update":"fulll !!!"
        });
    }
 });
});
