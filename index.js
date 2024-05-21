const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "src/public")));
app.use(bodyParser.json());

// Routes
app.get("/query", (req, res) => {
  res.render("query", { title: "Home Page" });
});
app.get("", (req, res) => {
  res.render("index", { title: "Home Page" });
});
app.get("/createtable", (req, res) => {
  res.render("createTable", { title: "Create Table Page" });
});
app.get("/insert/:table", (req, res) => {
  const tableName = req.params.name;
  res.render("insert", { tableName });
});
app.get("/edit/:table/:id", (req, res) => {
  const tableName = req.params.table;
  const id = req.params.id;
  res.render("edit", { tableName, id });
});
const tableRoutes = require("./src/routes/tables");
const logger = require("./src/Utils/logger");
const { InitializeDB } = require("./src/Utils/displayTables");

async function SqliteGuiNode(db, port = 8080) {
  InitializeDB();
  app.use("/api/tables", tableRoutes(db));
  app.listen(port, () => {
    logger.info(`SQLite Web Admin Tool running at http://localhost:${port}`);
  });
}

module.exports = SqliteGuiNode;
