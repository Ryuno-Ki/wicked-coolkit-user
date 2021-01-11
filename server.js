const server = require("wicked-coolkit")

const { start } = server({
  sf: {
    username: process.env.SALESFORCE_USER,
    password: process.env.SALESFORCE_PASSWORD,
    url: process.env.SALESFORCE_URL,
  },
  pg: process.env.DATABASE_URL,
  app: {
    port: process.env.PORT,
  },
})

start()
  .then(() => console.log(`Server started on port ${config.host.port}/`))
  .catch(console.error)
