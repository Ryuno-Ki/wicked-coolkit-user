require("dotenv").config()
const express = require("express")
const server = require("wicked-coolkit")

const {
  SALESFORCE_URL,
  SALESFORCE_USER,
  SALESFORCE_PASSWORD,
  DATABASE_URL,
  PORT,
} = process.env

const { start, app } = server({
  sf: {
    username: SALESFORCE_USER,
    password: SALESFORCE_PASSWORD,
    url: SALESFORCE_URL,
  },
  pg: {
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  },
  app: {
    port: PORT,
  },
})

app.use(express.static("./public"))

app.set("view engine", "html")
app.engine("html", require("hbs").__express)
app.set("views", __dirname + "/views")

app.get("/", (req, res) => res.render("trading-card"))
app.get("/getting-started", (req, res) => res.render("getting-started"))

start()
  .then(() => console.log(`Server started on port ${PORT}`))
  .catch(console.error)
