const fs = require("fs");
const PDFDocument = require("pdfkit");

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
    .font("fonts/avenirnext-demibold.ttf")
    .fontSize(36)
    .text("Scorecard", 50, 50)
    .image('images/logo.png', 380, 15, {width: 200})
}

function generateKeys(doc, data) {
  doc
    .fontSize(14)
    .font("fonts/avenirnext-demibold.ttf")
    .text("Key of Interest: ", 50, 115, { lineBreak: false })
    .font("fonts/avenirnext-regular.ttf")
    .text(data.keys.interest)
    .font("fonts/avenirnext-demibold.ttf")
    .text("Keywords: ", 50, doc.y, { lineBreak: false })
    .font("fonts/avenirnext-regular.ttf")
    .text(data.keys.keywords)
    .font("fonts/avenirnext-demibold.ttf")

  doc
    .font("fonts/avenirnext-demibold.ttf")
    .text("Impact: ", 50, doc.y + 5, { lineBreak: false })
    .font("fonts/avenirnext-regular.ttf")
    .text(data.score.impact)
    .font("fonts/avenirnext-demibold.ttf")
    .text("Certainity: ", 50, doc.y, { lineBreak: false })
    .font("fonts/avenirnext-regular.ttf")
    .text(data.score.certainity)
    .font("fonts/avenirnext-demibold.ttf")
    .text("Time Scale: ", 50, doc.y, { lineBreak: false })
    .font("fonts/avenirnext-regular.ttf")
    .text(data.score.timescale)

  generateHr(doc, doc.y + 10);
}

function generateBody(doc, data) {
  doc
    .font("fonts/avenirnext-demibold.ttf")
    .text("Summary: ", 50, doc.y + 20)
    .font("Times-Roman")
    .text(data.body.summary, doc.x, doc.y + 5)
    .font("fonts/avenirnext-demibold.ttf")
    .text("Implications: ", 50, doc.y + 10)
    .font("Times-Roman")
    .text(data.body.implications, doc.x, doc.y + 5)
    
  generateHr(doc, doc.y + 10);
}

function generateLinks(doc, data) {
  doc
  .font("fonts/avenirnext-demibold.ttf")
  .text("References/ Related Resources: ", 50, doc.y + 20)
  .font("Times-Roman")

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
