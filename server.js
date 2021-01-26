require("dotenv").config()
const express = require("express")
const server = require("wicked-coolkit")

const { start, app } = server({
  loginUrl: process.env.SALESFORCE_URL,
  authUrl: process.env.SALESFORCE_AUTH_URL,
  pg: process.env.DATABASE_URL,
})

app.use(express.static("./public"))

app.set("view engine", "html")
app.engine("html", require("hbs").__express)
app.set("views", __dirname + "/views")

app.get("/", (req, res) => res.render("trading-card"))
app.get("/getting-started", (req, res) => res.render("getting-started"))

start()
  .then(({ port }) =>
    console.log(
      `Server started on ${
        process.env.NODE_ENV === "production" ? "port " : "http://localhost:"
      }${port}`
    )
  )
  .catch(console.error)
