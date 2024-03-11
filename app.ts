import express from "express";
import {router as index} from "./api/index";
import {router as user} from "./api/user";
import {router as foods} from "./api/foods";
import { router as uplaods } from "./api/uplaods";

import bodyParser from "body-parser"; //รัลข้อมูลแบบ body ต้อง npm install body-parser ก่อน
import cors from "cors";
// import { router as user} from "./api/user";

export const app = express();  
app.use(
    cors({
      origin: "*",
    })
  );
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use("/", index);
app.use("/user" , user);
app.use("/foods" , foods);
app.use("/uplaods" , uplaods);
