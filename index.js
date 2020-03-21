const { createCard } = require("./src/createCard")
const fs = require("fs")

const data = require("./data.json")

if (!fs.existsSync(`${__dirname}/dist/`))
    fs.mkdirSync(`${__dirname}/dist/`)

data.forEach( data =>
    createCard(data, `${__dirname}/dist/${data.keys.interest}.pdf`, __dirname)
)