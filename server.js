const express = require("express")
const server = require("wicked-coolkit")

const { start, app } = server({
  sf: {
    username: process.env.SALESFORCE_USER,
    password: process.env.SALESFORCE_PASSWORD,
    url: process.env.SALESFORCE_URL,
  },
  pg: process.env.DATABASE_URL,
  app: {
    port: process.env.PORT || 3003,
  },
})

app.use(express.static("./public"))

app.set("view engine", "html")
app.engine("html", require("hbs").__express)
app.set("views", __dirname + "/views")

app.get("/", (req, res) =>
  res.render("index", { host: `${process.env.HEROKU_APP_NAME}.herokuapp.com` })
)

app.get("/getting-started", (req, res) =>
  res.render("getting-started", {
    host: `${process.env.HEROKU_APP_NAME}.herokuapp.com`,
  })
)

start()
  .then(() => console.log(`Server started on port ${config.host.port}/`))
  .catch(console.error)
