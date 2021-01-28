require("dotenv").config()
const express = require("express")
const server = require("wicked-coolkit")
const hbs = require("hbs")
const pack = require("./package.json")
const wckVersion = pack.dependencies["wicked-coolkit"]

const PROD = process.env.NODE_ENV === "production"
const CDN = `https://unpkg.com/wicked-coolkit@${wckVersion}/dist`

const data = {
  dotMin: PROD ? ".min" : "",
  cdn: CDN,
  jsonData: JSON.stringify({ cdn: CDN }),
  bugsUrl: `${pack.bugs.url}/new`,
  repoUrl: pack.homepage,
}

const { start, app, sf } = server({
  loginUrl: process.env.SALESFORCE_URL,
  authUrl: process.env.SALESFORCE_AUTH_URL,
  pg: process.env.DATABASE_URL,
})

app.use(express.static("./public"))
app.set("view engine", "html")
app.engine("html", hbs.__express)

app.get("/", (req, res) => {
  res.render("trading-card", data)
})

app.get("/getting-started", (req, res) => {
  res.render("getting-started", {
    ...data,
    error: !!req.query.auth_error,
    success: !!req.query.auth_success,
    auth: !!sf.connection,
  })
})

start()
  .then(({ port }) =>
    console.log(
      `Server started on ${PROD ? "port " : "http://localhost:"}${port}`
    )
  )
  .catch(console.error)
