require("dotenv").config()
const express = require("express")
const server = require("wicked-coolkit")

const {
  SALESFORCE_URL = "https://login.salesforce.com",
  SALESFORCE_AUTH_URL = "https://wickedcoolkit-oauth.herokuapp.com",
  PORT = 3002,
  DATABASE_URL,
  NODE_ENV,
} = process.env

const { start, app } = server({
  sf: {
    loginUrl: SALESFORCE_URL,
    authUrl: SALESFORCE_AUTH_URL,
  },
  pg: {
    connectionString: DATABASE_URL,
    ssl: DATABASE_URL.match(/\blocalhost\b/)
      ? false
      : { rejectUnauthorized: false },
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
  .then(() =>
    console.log(
      `Server started on ${
        NODE_ENV === "production" ? "port " : "http://localhost:"
      }${PORT}`
    )
  )
  .catch(console.error)
