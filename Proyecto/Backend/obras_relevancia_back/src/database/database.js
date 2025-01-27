import mysql from "mysql2";
import config from "./../config";

const connection = mysql.createConnection({
  host: config.host_sql,
  database: config.database_sql,
  user: config.user_sql,
  password: config.password_sql,
  port: config.port_sql,
});

// Manejador de eventos para la conexión
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to the database");
});

// Manejador de eventos para errores de la conexión
connection.on("error", (err) => {
  console.error("Database connection error:", err);
  // Puedes intentar reconectar o manejar el error de otra manera aquí
});

const getConnection = () => {
  return connection;
};

module.exports = {
  getConnection,
};
