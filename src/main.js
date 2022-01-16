import { PDFDocument, StandardFonts, rgb, PageSizes } from 'pdf-lib'

// Create a new PDFDocument
const pdfDoc = await PDFDocument.create()

// Embed the Times Roman font
const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

// A4 - 210mm x 297mm
// A4 - 595.28, 841.89
// Box w25,4 x h10 mm
const factor = 2.83466
// Add a blank page to the document
const page = pdfDoc.addPage(PageSizes.A4)

// Get the width and height of the page
const { width, height } = page.getSize()

function fromMm(mm) {
  return mm * factor;
}

const boxH = 10;
const boxW = 25.3;
const spaceBetween = 4;
const spaceTop = 14;
const spaceLeft = 8;

// Draw a string of text toward the top of the page
const fontSize = 30
let top = height-fromMm(spaceTop);
let left = fromMm(spaceLeft);
for (let j = 0; j < 27; j++) {
  for (let i = 0; i < 7; i++) {
    page.drawRectangle({
      x: left,
      y: top,
      width: fromMm(boxW),
      height: fromMm(boxH),
      borderWidth: 0,
      color: rgb(0.75, 0.2, 0.2),
      opacity: 0.5,
    });
    left += fromMm(spaceBetween+boxW);
  }
  left = fromMm(spaceLeft);
  top -= fromMm(boxH);
}

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
