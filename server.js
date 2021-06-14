const fs = require("fs").promises;
const express = require("express");

const app = express();
const port = 3000;

app.use(express.static("static"));
app.use(express.static("sketches"));

app.get("/:category/:sketch", async (req, res) => {
    try {
        const template = await fs.readFile(__dirname + "/static/index.html", "utf8");
        const category = req.params.category.replace("-", "_");
        const sketch = req.params.sketch.replace("-", "_");
        const filepath = `${category}/${sketch}.js`;
        const data = template.replace("#SKETCH_FILE#", filepath);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    } catch(err) {
        res.status(500).send("Could not load 'index.html'");
    }
});

app.listen(port, () => console.log(`Server started on port ${port}.`));