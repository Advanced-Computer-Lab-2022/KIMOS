const PDFDocument = require('pdfkit');
function jumpLine(doc, lines) {
  for (let index = 0; index < lines; index++) {
    doc.moveDown();
  }
}

const fillCertificate = (doc, instructorName, studentName, title) => {
  doc.rect(0, 0, doc.page.width, doc.page.height).fill('#fff');

  doc.fontSize(10);

  // Margin
  const distanceMargin = 18;

  doc
    .fillAndStroke('#D80621')
    .lineWidth(20)
    .lineJoin('round')
    .rect(
      distanceMargin,
      distanceMargin,
      doc.page.width - distanceMargin * 2,
      doc.page.height - distanceMargin * 2
    )
    .stroke();

  // Header
  const maxWidth = 140;
  const maxHeight = 70;

  doc.image(__dirname + '/assets/cancham.png', doc.page.width / 2 - maxWidth / 2, 60, {
    fit: [maxWidth, maxHeight],
    align: 'center'
  });

  jumpLine(doc, 5);

  doc
    .font(__dirname + '/assets/fonts/NotoSansJP-Light.otf')
    .fontSize(10)
    .fill('#021c27')
    .text('Canadian Chamber of Commerce', {
      align: 'center'
    });

  jumpLine(doc, 2);

  // Content
  doc
    .font(__dirname + '/assets/fonts/NotoSansJP-Regular.otf')
    .fontSize(16)
    .fill('#021c27')
    .text('CERTIFICATE OF COMPLETION', {
      align: 'center'
    });

  jumpLine(doc, 1);

  doc
    .font(__dirname + '/assets/fonts/NotoSansJP-Light.otf')
    .fontSize(10)
    .fill('#021c27')
    .text('Presented to', {
      align: 'center'
    });

  jumpLine(doc, 2);

  doc
    .font(__dirname + '/assets/fonts/NotoSansJP-Bold.otf')
    .fontSize(24)
    .fill('#021c27')
    .text(studentName, {
      align: 'center'
    });

  jumpLine(doc, 1);

  doc
    .font(__dirname + '/assets/fonts/NotoSansJP-Light.otf')
    .fontSize(10)
    .fill('#021c27')
    .text(`Successfully completed the ${title} course.`, {
      align: 'center'
    });

  jumpLine(doc, 7);

  doc.lineWidth(1);

  // Signatures
  const lineSize = 174;
  const signatureHeight = 390;

  doc.fillAndStroke('#021c27');
  doc.strokeOpacity(0.2);

  const startLine1 = 128;
  const endLine1 = 128 + lineSize;
  doc.moveTo(startLine1, signatureHeight).lineTo(endLine1, signatureHeight).stroke();

  const startLine2 = endLine1 + 32;
  const endLine2 = startLine2 + lineSize;
  doc.moveTo(startLine2, signatureHeight).lineTo(endLine2, signatureHeight).stroke();

  const startLine3 = endLine2 + 32;
  const endLine3 = startLine3 + lineSize;
  doc.moveTo(startLine3, signatureHeight).lineTo(endLine3, signatureHeight).stroke();

  doc
    .font(__dirname + '/assets/fonts/NotoSansJP-Bold.otf')
    .fontSize(10)
    .fill('#021c27')
    .text(instructorName, startLine1, signatureHeight + 10, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: 'center'
    });

  doc
    .font(__dirname + '/assets/fonts/NotoSansJP-Light.otf')
    .fontSize(10)
    .fill('#021c27')
    .text('Associate Professor', startLine1, signatureHeight + 25, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: 'center'
    });

  doc
    .font(__dirname + '/assets/fonts/NotoSansJP-Bold.otf')
    .fontSize(10)
    .fill('#021c27')
    .text(studentName, startLine2, signatureHeight + 10, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: 'center'
    });

  doc
    .font(__dirname + '/assets/fonts/NotoSansJP-Light.otf')
    .fontSize(10)
    .fill('#021c27')
    .text('Student', startLine2, signatureHeight + 25, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: 'center'
    });

  doc
    .font(__dirname + '/assets/fonts/NotoSansJP-Bold.otf')
    .fontSize(10)
    .fill('#021c27')
    .text('Jane Doe', startLine3, signatureHeight + 10, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: 'center'
    });

  doc
    .font(__dirname + '/assets/fonts/NotoSansJP-Light.otf')
    .fontSize(10)
    .fill('#021c27')
    .text('Director', startLine3, signatureHeight + 25, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: 'center'
    });

  jumpLine(doc, 4);

  // Validation link
  // const link = 'https://validate-your-certificate.hello/validation-code-here';

  // const linkWidth = doc.widthOfString(link);
  // const linkHeight = doc.currentLineHeight();

  // doc
  //   .underline(doc.page.width / 2 - linkWidth / 2, 448, linkWidth, linkHeight, { color: '#021c27' })
  //   .link(doc.page.width / 2 - linkWidth / 2, 448, linkWidth, linkHeight, link);

  // doc
  //   .font(__dirname + '/assets/fonts/NotoSansJP-Light.otf')
  //   .fontSize(10)
  //   .fill('#021c27')
  //   .text(link, doc.page.width / 2 - linkWidth / 2, 448, linkWidth, linkHeight);

  // Footer
  const bottomHeight = doc.page.height - 100;
};
module.exports = {
  fillCertificate
};
