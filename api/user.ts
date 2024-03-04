import { conn, queryAsync } from "../dbconn";
import { json } from "body-parser";
import express, { query } from "express";
import mysql from "mysql";
import { UserPostResp } from "../model/user_post_resp";

export const router = express.Router();
router.get("/newUser",(req,res)=>{
  let sql = "SELECT uid FROM `user` ORDER BY `user`.`uid` DESC LIMIT 1;";
  conn.query(sql,(err,result)=>{
    if(err) throw err;
    res.status(200).json(result);
  });
});
router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  if (req.params.id) {
    const sql = "select * from user where uid = ?";
    conn.query(sql, [id], (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        console.log(id);
        res.json(result);
      }
    });
  } else {
    res.status(200).json({ data: "No data" + id });
  }
});

router.get("/", (req, res) => {
  const sql = "select * from user ";
  conn.query(sql, (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(result);
    }
  });
});

router.get("/foods/:id",(req,res)=>{
  const uid = req.params.id;
  let sql = "SELECT foods.img,user.name,user.last_name,user.avatar from user INNER JOIN foods on foods.uid_fid = user.uid where uid = ?";
  sql = mysql.format(sql,[
    uid
  ]);
  conn.query(sql,(err,result)=>{
      if(err){
        res.status(400).json(err);
      }else{
        res.status(200).json(result);
      }
  });

});
router.post("/insert", (req, res) => {
  let user: UserPostResp = req.body;
  let sql =
    "INSERT INTO `user` (`name`, `type`, `email`, `pass`) VALUES (?,?,?,?)";
  sql = mysql.format(sql, [
    user.name,
    user.type,
    user.email,
    user.pass,
    // user.avatar,
    // user.last_name,
  ]);
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.json({ affected_row: result.affectedRows, last_idx: result.insertId });
  });
});

router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  let user: UserPostResp = req.body;

  let sql = "SELECT * FROM `user` WHERE uid = ?";
  sql = mysql.format(sql, [id]);

  const result = await queryAsync(sql);
  const jsonStr = JSON.stringify(result);
  const jsonObj = JSON.parse(jsonStr);

  let userOriginal: UserPostResp | undefined;
  userOriginal = jsonObj[0] as UserPostResp;

  let updateUser = { ...userOriginal, ...user };
  console.log(user);
  console.log(updateUser);

  sql =
    "update  `user` set `name`=?, `type`=?, `email`=?, `pass`=?, `avatar`=?, `last_name`=? where `uid`=?";
  sql = mysql.format(sql, [
    updateUser.name,
    updateUser.type,
    updateUser.email,
    updateUser.pass,
    updateUser.avatar,
    updateUser.last_name,
    id,
  ]);
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.status(201).json({ affected_row: result.affectedRows });
  });
});

router.post("/addData",(req,res)=>{
  // const uid = req.query.uid;
  // const name = req.query.name;
  // const type = 0;
  // // const last_name = req.query.last_name;
  // const email = req.query.email;
  // const pass = req.query.pass;
  let user: UserPostResp = req.body;  
  let sql = "insert into `user`( `name`,`type`,`email`,`pass` )value(?,?,?,?)";
  sql = mysql.format(sql,[
    user.name,
    user.type,
    user.email,
    user.pass
  ]);
  conn.query(sql,(err,result)=>{
    if(err){
      res.status(400).json(err);
    }else{
      res.status(200).json({
        affected_row: result.affected_row ,
        add_data : "Add Data successfull"
      
    });
    }
  });
});
// router.put("/update_user",(req,res)=>{
//     const 
// });

