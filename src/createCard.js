const fs = require("fs");
const PDFDocument = require("pdfkit");

const head = "fonts/avenirnext-demibold.ttf"
const key = "fonts/avenirnext-regular.ttf"
const body = "fonts/avenirnext-regular.ttf"

function createCard(data, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateKeys(doc, data);
  generateBody(doc, data);
  generateLinks(doc, data);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
  doc
    .font(head)
    .fontSize(36)
    .text("Scorecard", 50, 50)
    .image('images/logo.png', 380, 15, {width: 200})
}

function generateKeys(doc, data) {
  doc
    .fontSize(14)
    .font(head)
    .text(`Key of Interest:  ${data.keys.interest}`, 50, 115)
    .text("Keywords: ", 50, doc.y + 5, { lineBreak: false })
    .font(key)
    .text(data.keys.keywords, 130, doc.y)
    .font(head)

  doc
    .font(head)
    .text("Impact: ", 50, doc.y + 5, { lineBreak: false })
    .font(key)
    .text(data.score.impact, 130, doc.y)
    .font(head)
    .text("Certainity: ", 50, doc.y, { lineBreak: false })
    .font(key)
    .text(data.score.certainity, 130, doc.y)
    .font(head)
    .text("Time Scale: ", 50, doc.y, { lineBreak: false })
    .font(key)
    .text(data.score.timescale, 130, doc.y)

  generateHr(doc, doc.y + 10);
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
    
  generateHr(doc, doc.y + 10);
}

function generateLinks(doc, data) {
  doc
  .font("fonts/avenirnext-demibold.ttf")
  .text("References/ Related Resources: ", 50, doc.y + 20)
  .font(body)

  data.links.forEach( el => doc.text( el.name, {
    link: el.link,
    underline: true
  }) )
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

module.exports = {
  createCard
};
