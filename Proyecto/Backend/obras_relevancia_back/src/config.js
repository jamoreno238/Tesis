import { config } from "dotenv";

config();

export default {
    host_sql: process.env.MYSQLHOST || "",
    database_sql: process.env.MYSQLDATABASE || "",
    user_sql: process.env.MYSQLUSER || "" ,
    password_sql: process.env.MYSQLPASSWORD || "",
    port_sql: process.env.MYSQLPORT || "",
    email: process.env.EMAIL || "",
    password_email: process.env.EMAIL_PASSWORD || "",
}
