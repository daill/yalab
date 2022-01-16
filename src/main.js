import { PDFDocument, StandardFonts, rgb, PageSizes } from 'pdf-lib'

// Create a new PDFDocument
const pdfDoc = await PDFDocument.create()

// Embed the Times Roman font
const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

// A4 - 210mm x 297mm
// A4 - 595.28, 841.89
const factor = 2.83466
// Add a blank page to the document
const page = pdfDoc.addPage(PageSizes.A4)

// Get the width and height of the page
const { width, height } = page.getSize()

function fromMm(mm) {
  return mm * factor;
}

// Draw a string of text toward the top of the page
const fontSize = 30
page.drawText('Creating PDFs in JavaScript is awesome!', {
  x: fromMm(8),
  y: height-fromMm(14),
  size: fontSize,
  font: timesRomanFont,
  color: rgb(0, 0.53, 0.71),
})

// Serialize the PDFDocument to bytes (a Uint8Array)
const pdfBytes = await pdfDoc.save()

function download(filename, data, type) {
    var element = document.createElement('a');
    element.setAttribute('href', window.URL.createObjectURL(new Blob([data], {type: type})));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(element);
  }


download("pdf-lib_form_flattening_example.pdf", pdfBytes, "application/pdf");
