const fs = require("fs");
const express = require("express");

const app = express();
const port = 9000;

app.use(express.static("static"));
app.use(express.static("sketches"));

app.get("/", (req, res) => {
    fs.readFile(__dirname + "/static/index.html", (err, data) => {
        if(err) {
            res.status(500).send("Could not load 'index.html'");
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data);
            res.end();
        }
    });
});

app.listen(port, () => console.log("Server started."));