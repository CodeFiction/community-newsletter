require("dotenv").config();
const express = require("express");
const { getMessages } = require("./src/main");

const app = express();
app.set("port", process.env.PORT || 4000);

app.get("/messages", async (req, res) => {
  return res.json(await getMessages()).status(200);
});

app.listen(app.get("port"), () =>
  console.log(`Server is ready at http://localhost:${app.get("port")}`)
);
