require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const cors = require('cors')
const db = require("./app/models");
const fileUpload = require("express-fileupload")
const os = require("os");
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const swaggerUi = require('swagger-ui-express')


const authRouter = require("./app/routes/auth.routes")
const postRouter = require("./app/routes/post.routes")
const imageRouter = require("./app/routes/image.routes")

const PORT = process.env.PORT || 3333;
const app = express()
app.use(express.static("public"))

// define the first route
app.get("/", function (req, res) {
  res.send("login.html")
})
app.use(express.json())
app.use(cors({
    origin: "https://blog-testt.herokuapp.com/",
  }))

app.use(fileUpload())
db.sequelize.sync();

app.use('/auth', authRouter)
app.use('/api', postRouter)
app.use('/api', imageRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/*app.listen(PORT, (req, res) => {
    console.log(`server started on post ${PORT}`)
})*/

const server = app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Server listens http://${process.env.HOST}:${process.env.PORT}`);
  });
