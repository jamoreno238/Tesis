import app from "./src/app";

const main = () =>{
    app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
    app.get("/", (req, res) => {
        res.send("APIs");
      });
    
};

main();
