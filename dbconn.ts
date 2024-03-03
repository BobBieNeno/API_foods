import mysql from "mysql";
import util from "util";
// createPoolเรียกหลายๆคนพร้อมๆกัน
export const conn = mysql.createPool(
    {
        connectionLimit : 10,
        host : "202.28.34.197",
        user : "web66_65011212243",
        password : "65011212243@csmsu",
        database : "web66_65011212243"
    }
    );
export   const queryAsync = util.promisify(conn.query).bind(conn);