const fs = require("fs")
const PDFDocument = require("pdfkit")
const imageSize = require("image-size")

const head = "fonts/avenirnext-demibold.ttf"
const key = "fonts/avenirnext-regular.ttf"
const body = "fonts/avenirnext-regular.ttf"

function createCard(data, path, dirname) {
  let doc = new PDFDocument({
    size: "A4",
    margin: 50
  })

  generateHeader(doc)
  generateKeys(doc, data)
  generateBody(doc, data)
  generateTimeline(doc, data)
  generateLinks(doc, data)
  generateFigures(doc, data, dirname)

  doc.end()
  doc.pipe(fs.createWriteStream(path))
}

function generateHeader(doc) {
  doc
    .font(head)
    .fontSize(36)
    .text("Scorecard", 50, 50)
    .image('images/logo.png', 380, 15, {
      width: 200
    })
}

function generateKeys(doc, data) {
  doc
    .fontSize(14)
    .font(head)
    .text(`Key of Interest:  ${data.keys.interest}`, 50, 115)
    .text("Keywords: ", 50, doc.y + 5, {
      lineBreak: false
    })
    .font(key)
    .text(data.keys.keywords, 130, doc.y)
    .font(head)

  doc
    .font(head)
    .text("Impact: ", 50, doc.y + 5, {
      lineBreak: false
    })
    .font(key)
    .text(data.score.impact, 130, doc.y)
    .font(head)
    .text("Certainity: ", 50, doc.y, {
      lineBreak: false
    })
    .font(key)
    .text(data.score.certainity, 130, doc.y)
    .font(head)
    .text("Time Scale: ", 50, doc.y, {
      lineBreak: false
    })
    .font(key)
    .text(data.score.timescale, 130, doc.y)

  generateHr(doc, doc.y + 10)
}

function generateBody(doc, data) {
  doc
    .font(head)
    .text("Summary: ", 50, doc.y + 20)
    .font(body)
    .text(data.body.summary, doc.x, doc.y + 5)
    .font(head)
    .text("Implications: ", 50, doc.y + 10)
    .font(body)
    .text(data.body.implications, doc.x, doc.y + 5)

  generateHr(doc, doc.y + 10)
}

function generateTimeline(doc, data) {
  if (data.timeline) {
    doc
    .font(head)
    .text("Brief Timeline: ", 50, doc.y + 20)
    .font(body)
    .text(data.timeline, doc.x, doc.y + 5)

  generateHr(doc, doc.y + 10)
  }
}

function generateLinks(doc, data) {
  doc
    .font(head)
    .text("References/ Related Resources: ", 50, doc.y + 20)
    .font(body)
    .fillColor("#2C528C")

  data.links.forEach(el => doc.text(el.name, {
    link: el.link,
    underline: true
  }))
  generateHr(doc, doc.y + 10)
}

function generateFigures(doc, data, dirname) {
  if (data.figures) {
    doc
      .fillColor("#000000")
      .font(head)
      .text("Figures: ", 50, doc.y + 20)
      .font(body)
    let count = 1
    let prevHeight = 10
    let addPage = 0
    data.figures.forEach(el => {
      if (doc.y >= 550) {
        doc.addPage()
        addPage = 1
      }
      const image = `${dirname}/images/${el.name}`
      const dimensions = imageSize(image)
      doc.image(image, 50, addPage ? 50 : doc.y + prevHeight, {
          width: 200
        }).text(`Figure ${count}: (${el.name}) ${el.caption}`, 270, addPage ? 50 : doc.y + prevHeight)
        ++count
      prevHeight = (200 / dimensions.width) * dimensions.height
      addPage = 0
    })
  }
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke()
}

module.exports = {
  createCard
}